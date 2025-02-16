// pages/admin/subscriptions/index.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SubscriptionsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Subscriptions</h1>
          <p className="text-gray-600">Manage subscription plans and users</p>
        </div>

        {/* Subscription Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Active subscriptions count */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Monthly revenue stats */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Plan distribution chart */}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionsPage;