'use client'

import { Card, Select, SelectItem, DateRangePicker, type DateRangePickerValue } from "@tremor/react";
import { useState } from "react";

const reportTypes = [
  { value: "occupancy", label: "Occupancy Reports" },
  { value: "revenue", label: "Revenue Reports" },
  { value: "leads", label: "Lead Conversion Metrics" },
  { value: "service", label: "Service Efficiency" },
  { value: "guest", label: "Guest Statistics" },
  { value: "staff", label: "Staff Performance" },
];

export function ReportsFilters() {
  const [selectedReportType, setSelectedReportType] = useState("occupancy");
  const [dateRange, setDateRange] = useState<DateRangePickerValue>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  return (
    <Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Select
            value={selectedReportType}
            onValueChange={setSelectedReportType}
            placeholder="Select Report Type"
          >
            {reportTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div>
          <DateRangePicker
            value={dateRange}
            onValueChange={setDateRange}
            selectPlaceholder="Select Date Range"
            className="max-w-full"
          />
        </div>
      </div>
    </Card>
  );
} 