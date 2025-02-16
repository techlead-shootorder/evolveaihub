// pages/admin/subscriptions/plans.tsx
import React from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlansPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <p className="text-gray-600">Manage subscription plans</p>
        </div>

        {/* Plans Management */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Add plan cards */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default PlansPage;