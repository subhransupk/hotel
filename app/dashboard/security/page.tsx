'use client';

import { useState } from 'react';
import {
  ShieldCheckIcon,
  KeyIcon,
  VideoCameraIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  BellIcon,
  LockClosedIcon,
  ClockIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  Card,
  Title,
  Text,
  TabGroup,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Grid,
  Col,
  Metric,
  Badge,
  List,
  ListItem,
  Button,
  AreaChart,
} from '@tremor/react';

interface SecurityAlert {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  status: 'critical' | 'warning' | 'resolved';
  description: string;
}

interface AccessLog {
  id: string;
  name: string;
  accessPoint: string;
  timestamp: string;
  status: 'granted' | 'denied';
  cardId: string;
}

const securityAlerts: SecurityAlert[] = [
  {
    id: '1',
    type: 'Door Forced',
    location: 'Emergency Exit - Floor 2',
    timestamp: '2024-02-15 14:23',
    status: 'critical',
    description: 'Emergency exit door was forced open'
  },
  {
    id: '2',
    type: 'Multiple Access Attempts',
    location: 'Room 304',
    timestamp: '2024-02-15 13:45',
    status: 'warning',
    description: 'Multiple failed access attempts detected'
  },
  {
    id: '3',
    type: 'Camera Offline',
    location: 'Parking Level B1',
    timestamp: '2024-02-15 12:30',
    status: 'resolved',
    description: 'Security camera went offline temporarily'
  },
];

const accessLogs: AccessLog[] = [
  {
    id: '1',
    name: 'John Smith',
    accessPoint: 'Main Entrance',
    timestamp: '2024-02-15 14:30',
    status: 'granted',
    cardId: 'KC-2234'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    accessPoint: 'Staff Room',
    timestamp: '2024-02-15 14:25',
    status: 'granted',
    cardId: 'KC-1192'
  },
  {
    id: '3',
    name: 'Unknown Card',
    accessPoint: 'Service Entrance',
    timestamp: '2024-02-15 14:20',
    status: 'denied',
    cardId: 'KC-9981'
  },
];

const chartdata = [
  { date: '2024-02-09', "Access Events": 245, "Security Alerts": 2 },
  { date: '2024-02-10', "Access Events": 267, "Security Alerts": 3 },
  { date: '2024-02-11', "Access Events": 240, "Security Alerts": 1 },
  { date: '2024-02-12', "Access Events": 280, "Security Alerts": 4 },
  { date: '2024-02-13', "Access Events": 295, "Security Alerts": 2 },
  { date: '2024-02-14', "Access Events": 270, "Security Alerts": 3 },
  { date: '2024-02-15', "Access Events": 258, "Security Alerts": 5 },
];

export default function SecurityPage() {
  const [selectedView, setSelectedView] = useState(0);
  const [showAlerts, setShowAlerts] = useState(false);

  const activeAlerts = securityAlerts.filter(alert => alert.status !== 'resolved');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <Title>Security Dashboard</Title>
          <Text>Monitor and manage hotel security</Text>
        </div>
        <div className="relative">
          <Button
            icon={BellIcon}
            color="red"
            variant="secondary"
            className="relative"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
              {activeAlerts.length}
            </span>
            Alerts
          </Button>

          {/* Alerts Dropdown */}
          {showAlerts && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowAlerts(false)}
              />
              
              <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    <Text className="font-medium">Active Alerts</Text>
                  </div>
                  <button
                    onClick={() => setShowAlerts(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto px-4">
                  {activeAlerts.length > 0 ? (
                    <List className="divide-y divide-gray-200 dark:divide-gray-700">
                      {activeAlerts.map((alert) => (
                        <ListItem key={alert.id} className="px-2 py-3">
                          <div className="flex items-start justify-between w-full">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Text className="font-medium">{alert.type}</Text>
                                <Badge
                                  color={alert.status === 'critical' ? 'red' : 'yellow'}
                                  size="sm"
                                >
                                  {alert.status}
                                </Badge>
                              </div>
                              <Text className="text-sm text-gray-500">{alert.description}</Text>
                              <div className="flex items-center gap-2">
                                <Text className="text-xs text-gray-500">{alert.location}</Text>
                                <span className="text-gray-300">•</span>
                                <Text className="text-xs text-gray-500">{alert.timestamp}</Text>
                              </div>
                            </div>
                          </div>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <div className="py-8 text-center">
                      <Text className="text-gray-500">No active alerts</Text>
                    </div>
                  )}
                </div>
                <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-lg">
                  <Button
                    size="xs"
                    variant="light"
                    color="gray"
                    className="w-full"
                    onClick={() => {
                      setSelectedView(0);
                      setShowAlerts(false);
                    }}
                  >
                    View All Alerts
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Security Overview Cards */}
      <Grid numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor="green">
          <div className="flex items-center justify-between">
            <div>
              <Text>Active Cameras</Text>
              <Metric>24/25</Metric>
            </div>
            <VideoCameraIcon className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card decoration="top" decorationColor="blue">
          <div className="flex items-center justify-between">
            <div>
              <Text>Active Key Cards</Text>
              <Metric>142</Metric>
            </div>
            <KeyIcon className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card decoration="top" decorationColor="yellow">
          <div className="flex items-center justify-between">
            <div>
              <Text>Staff On Duty</Text>
              <Metric>8</Metric>
            </div>
            <UserGroupIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card decoration="top" decorationColor="red">
          <div className="flex items-center justify-between">
            <div>
              <Text>Active Alerts</Text>
              <Metric>3</Metric>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </Grid>

      <TabGroup index={selectedView} onIndexChange={setSelectedView}>
        <TabList>
          <Tab icon={ShieldCheckIcon}>Overview</Tab>
          <Tab icon={LockClosedIcon}>Access Control</Tab>
          <Tab icon={VideoCameraIcon}>Surveillance</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <Grid numItemsMd={2} className="mt-6 gap-6">
              <Col>
                <Card>
                  <Title>Security Alerts</Title>
                  <List className="mt-4">
                    {securityAlerts.map((alert) => (
                      <ListItem key={alert.id}>
                        <div className="flex items-center justify-between w-full">
                          <div className="space-y-1">
                            <Text className="font-medium">{alert.type}</Text>
                            <div className="flex items-center gap-2">
                              <Text className="text-sm text-gray-500">{alert.location}</Text>
                              <span className="text-gray-300">•</span>
                              <Text className="text-sm text-gray-500">{alert.timestamp}</Text>
                            </div>
                          </div>
                          <Badge
                            color={
                              alert.status === 'critical' ? 'red' :
                              alert.status === 'warning' ? 'yellow' : 'green'
                            }
                          >
                            {alert.status}
                          </Badge>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Col>
              
              <Col>
                <Card>
                  <Title>Recent Access Logs</Title>
                  <List className="mt-4">
                    {accessLogs.map((log) => (
                      <ListItem key={log.id}>
                        <div className="flex items-center justify-between w-full">
                          <div className="space-y-1">
                            <Text className="font-medium">{log.name}</Text>
                            <div className="flex items-center gap-2">
                              <Text className="text-sm text-gray-500">{log.accessPoint}</Text>
                              <span className="text-gray-300">•</span>
                              <Text className="text-sm text-gray-500">Card: {log.cardId}</Text>
                            </div>
                          </div>
                          <Badge color={log.status === 'granted' ? 'green' : 'red'}>
                            {log.status}
                          </Badge>
                        </div>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Col>
            </Grid>

            <Card className="mt-6">
              <Title>Security Events Trend</Title>
              <AreaChart
                className="mt-4 h-72"
                data={chartdata}
                index="date"
                categories={["Access Events", "Security Alerts"]}
                colors={["blue", "red"]}
                valueFormatter={(number: number) => Intl.NumberFormat("us").format(number).toString()}
              />
            </Card>
          </TabPanel>

          <TabPanel>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Title>Access Points Status</Title>
                <List className="mt-4">
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Main Entrance</Text>
                      <Badge color="green">Secured</Badge>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Service Entrance</Text>
                      <Badge color="green">Secured</Badge>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Emergency Exit - Floor 2</Text>
                      <Badge color="red">Alert</Badge>
                    </div>
                  </ListItem>
                </List>
              </Card>

              <Card>
                <Title>Key Card Management</Title>
                <List className="mt-4">
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Active Cards</Text>
                      <Text>142</Text>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Deactivated Cards</Text>
                      <Text>23</Text>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Guest Cards</Text>
                      <Text>98</Text>
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className="flex items-center justify-between w-full">
                      <Text>Staff Cards</Text>
                      <Text>44</Text>
                    </div>
                  </ListItem>
                </List>
              </Card>
            </div>
          </TabPanel>

          <TabPanel>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index}>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
                    <div className="w-full h-full flex items-center justify-center">
                      <VideoCameraIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="font-medium">Camera {index + 1}</Text>
                      <Text className="text-sm text-gray-500">
                        {['Lobby', 'Main Entrance', 'Parking', 'Corridor 1', 'Pool Area', 'Service Area'][index]}
                      </Text>
                    </div>
                    <Badge color="green">Live</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
} 