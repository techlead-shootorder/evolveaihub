// pages/admin/users/create.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateUserPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create User</h1>
          <p className="text-gray-600">Add a new user to the platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New User</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add create user form */}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default CreateUserPage;