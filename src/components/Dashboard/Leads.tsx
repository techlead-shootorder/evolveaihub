"use client";

import { useEffect, useState } from "react";

const Leads = ({ userDetails, chatbotData }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("/api/leads/getLeads");
        if (!response.ok) throw new Error("Failed to fetch leads");
        
        const data = await response.json();
        const chatbotIds = new Set(chatbotData.map(bot => bot.id));
        const result = data.filter(lead => chatbotIds.has(lead.chatbotId));
        console.log("leads data", result);
        setLeads(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const exportToCSV = () => {
    const headers = ["Bot Name", "Name", "Email", "Phone", "Status", "Source", "Created At"];
    const csvRows = [headers.join(",")];
  
    leads.forEach(item => {
      const row = [
        item?.chatbot?.botName || "",
        item?.name || "",
        item?.email || "",
        item?.phone || "",
        item?.status || "",
        item?.source || "",
        formatDate(item?.createdAt) || ""
      ];
      csvRows.push(row.join(","));
    });
  
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={exportToCSV}
        >
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
             
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Bot Name</th>
              {/* <th className="px-4 py-2 border">Status</th> */}
              {/* <th className="px-4 py-2 border">Source</th> */}
              <th className="px-4 py-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {leads.length > 0 && leads.map((item) => (
              <tr className="hover:bg-gray-100" key={item?.id}>
               
                <td className="px-4 py-2 border">{item?.name}</td>
                <td className="px-4 py-2 border">{item?.email}</td>
                <td className="px-4 py-2 border">{item?.phone}</td>
                <td className="px-4 py-2 border">{item?.chatbot?.botName}</td>
                {/* <td className="px-4 py-2 border">{item?.status}</td> */}
                {/* <td className="px-4 py-2 border">{item?.source}</td> */}
                <td className="px-4 py-2 border">{formatDate(item?.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leads;
