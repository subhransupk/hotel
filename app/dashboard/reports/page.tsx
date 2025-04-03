import { Card, Title, Text } from "@tremor/react";
import { ReportsOverview } from "@/components/reports/reports-overview";
import { ReportsMetrics } from "@/components/reports/reports-metrics";
import { ReportsFilters } from "@/components/reports/reports-filters";

export const metadata = {
  title: "Reports & Analytics | Dashboard",
  description: "Comprehensive reports and analytics dashboard",
};

export default async function DashboardReportsPage() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Title>Reports & Analytics</Title>
        <Text>Comprehensive overview of your hotel's performance metrics</Text>
      </div>
      
      <ReportsFilters />
      <ReportsOverview />
      <ReportsMetrics />
    </div>
  );
} 