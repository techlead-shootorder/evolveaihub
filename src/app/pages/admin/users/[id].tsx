// pages/admin/users/[id].tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDetailsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">User Details</h1>
          <p className="text-gray-600">View and edit user information</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add user details form */}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserDetailsPage;