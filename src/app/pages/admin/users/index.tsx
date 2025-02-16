// pages/admin/users/index.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const UsersPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-gray-600">Manage platform users</p>
          </div>
          <a 
            href="/admin/users/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add User
          </a>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <Input 
            type="search"
            placeholder="Search users..."
            className="max-w-xs"
          />
          <select className="border rounded-md px-3 py-2">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Plan</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Add user rows */}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
