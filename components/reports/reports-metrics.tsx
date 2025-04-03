'use client'

import {
  Card,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  AreaChart,
  BarChart,
  DonutChart,
  Grid,
} from "@tremor/react";

const revenueData = [
  {
    date: "Jan 24",
    "Room Revenue": 28900,
    "F&B Revenue": 14000,
    "Other Revenue": 5000,
  },
  {
    date: "Feb 24",
    "Room Revenue": 32400,
    "F&B Revenue": 15600,
    "Other Revenue": 5800,
  },
  {
    date: "Mar 24",
    "Room Revenue": 35800,
    "F&B Revenue": 17200,
    "Other Revenue": 6200,
  },
  {
    date: "Apr 24",
    "Room Revenue": 37200,
    "F&B Revenue": 18400,
    "Other Revenue": 6800,
  },
  {
    date: "May 24",
    "Room Revenue": 39600,
    "F&B Revenue": 19200,
    "Other Revenue": 7200,
  },
  {
    date: "Jun 24",
    "Room Revenue": 42000,
    "F&B Revenue": 20800,
    "Other Revenue": 7800,
  },
];

const occupancyData = [
  {
    date: "Jan 24",
    "Standard Rooms": 75,
    "Deluxe Rooms": 82,
    "Suites": 95,
  },
  {
    date: "Feb 24",
    "Standard Rooms": 78,
    "Deluxe Rooms": 85,
    "Suites": 92,
  },
  {
    date: "Mar 24",
    "Standard Rooms": 82,
    "Deluxe Rooms": 88,
    "Suites": 96,
  },
  {
    date: "Apr 24",
    "Standard Rooms": 85,
    "Deluxe Rooms": 90,
    "Suites": 98,
  },
  {
    date: "May 24",
    "Standard Rooms": 88,
    "Deluxe Rooms": 92,
    "Suites": 97,
  },
  {
    date: "Jun 24",
    "Standard Rooms": 90,
    "Deluxe Rooms": 94,
    "Suites": 99,
  },
];

const serviceData = [
  { name: "Room Service", value: 35 },
  { name: "Housekeeping", value: 30 },
  { name: "Maintenance", value: 15 },
  { name: "Front Desk", value: 20 },
];

const valueFormatter = (number: number) => 
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export function ReportsMetrics() {
  return (
    <Card>
      <TabGroup>
        <TabList className="mt-8">
          <Tab>Revenue Analysis</Tab>
          <Tab>Occupancy Trends</Tab>
          <Tab>Service Distribution</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="mt-8">
              <Title>Revenue Breakdown</Title>
              <Text>Analysis of revenue streams over time</Text>
              <AreaChart
                className="mt-4 h-72"
                data={revenueData}
                index="date"
                categories={["Room Revenue", "F&B Revenue", "Other Revenue"]}
                colors={["blue", "cyan", "indigo"]}
                valueFormatter={valueFormatter}
                showLegend
                showGridLines
                showYAxis
                showXAxis
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
              <Title>Occupancy by Room Type</Title>
              <Text>Room occupancy rates over time</Text>
              <BarChart
                className="mt-4 h-72"
                data={occupancyData}
                index="date"
                categories={["Standard Rooms", "Deluxe Rooms", "Suites"]}
                colors={["blue", "cyan", "indigo"]}
                valueFormatter={(number) => `${number}%`}
                showLegend
                showGridLines
                showYAxis
                showXAxis
              />
            </div>
          </TabPanel>
          <TabPanel>
            <div className="mt-8">
              <Title>Service Request Distribution</Title>
              <Text>Breakdown of service requests by department</Text>
              <Grid numItemsLg={2} className="mt-8 gap-8">
                <DonutChart
                  className="mt-4 h-72"
                  data={serviceData}
                  category="value"
                  index="name"
                  valueFormatter={(number) => `${number}%`}
                  colors={["blue", "cyan", "indigo", "violet"]}
                  showAnimation
                  showTooltip
                  showLabel
                />
                <BarChart
                  className="mt-4 h-72"
                  data={serviceData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(number) => `${number}%`}
                  layout="vertical"
                  showLegend={false}
                  showGridLines
                  showYAxis
                  showXAxis
                />
              </Grid>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Card>
  );
} 