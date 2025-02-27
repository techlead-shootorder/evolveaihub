import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm } from 'formidable';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

export const config = {
  api: {
    bodyParser: false, // Important: Disable automatic body parsing
  },
};

async function convertToStream(req: NextRequest): Promise<NodeJS.ReadableStream> {
  const reader = req.body?.getReader();
  if (!reader) throw new Error("Request body is empty");

  const stream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }
      controller.close();
    },
  });

  return stream as unknown as NodeJS.ReadableStream;
}

export async function POST(req: NextRequest) {
  try {
    // Convert NextRequest body to a Readable Stream
    const rawReq = await convertToStream(req);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const form = new IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
    });

    // Parse the form using the converted raw request
    const parseForm = promisify(form.parse.bind(form));
    const [fields, files] = await parseForm(rawReq);

    if (!files.file || !Array.isArray(files.file) || files.file.length === 0) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const file = files.file[0];
    const fileExtension = path.extname(file.originalFilename || '');
    const fileName = `${uuidv4()}${fileExtension}`;
    const newPath = path.join(uploadsDir, fileName);

    fs.renameSync(file.filepath, newPath);

    const relativePath = `/uploads/${fileName}`;
    return NextResponse.json({ url: relativePath }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
