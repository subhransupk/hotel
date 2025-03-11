'use client'

import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
  Metric,
  Flex,
  ProgressBar,
} from "@tremor/react";
import {
  BanknotesIcon,
  UsersIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const metrics = [
  {
    title: "Total Revenue",
    metric: "$12,699",
    progress: 85,
    icon: BanknotesIcon,
    target: "$15,000",
  },
  {
    title: "Occupancy Rate",
    metric: "78%",
    progress: 78,
    icon: BuildingOfficeIcon,
    target: "85%",
  },
  {
    title: "Lead Conversion",
    metric: "64%",
    progress: 64,
    icon: ChartBarIcon,
    target: "70%",
  },
  {
    title: "Guest Satisfaction",
    metric: "4.8/5",
    progress: 92,
    icon: UsersIcon,
    target: "4.9/5",
  },
  {
    title: "Service Efficiency",
    metric: "92%",
    progress: 92,
    icon: ClipboardDocumentCheckIcon,
    target: "95%",
  },
  {
    title: "Staff Performance",
    metric: "88%",
    progress: 88,
    icon: UserGroupIcon,
    target: "90%",
  },
];

export function ReportsOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <Title>Key Performance Indicators</Title>
        <Text>Overview of important metrics for the selected period</Text>
        <Grid numItemsLg={3} className="mt-6 gap-6">
          {metrics.map((item) => (
            <Card key={item.title} decoration="top" decorationColor="blue">
              <Flex>
                <div className="flex items-center space-x-2">
                  <item.icon className="w-6 h-6 text-tremor-content-subtle" />
                  <div>
                    <Text>{item.title}</Text>
                    <Metric>{item.metric}</Metric>
                  </div>
                </div>
              </Flex>
              <Flex className="mt-4 space-x-2">
                <Text className="text-sm text-tremor-content-subtle">
                  Target: {item.target}
                </Text>
                <Text className="text-sm text-tremor-content-subtle">
                  {item.progress}%
                </Text>
              </Flex>
              <ProgressBar value={item.progress} className="mt-2" />
            </Card>
          ))}
        </Grid>
      </Card>
    </div>
  );
} 