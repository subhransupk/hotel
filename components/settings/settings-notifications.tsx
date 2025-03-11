'use client'

import { Card, Title, Text, Switch, Button } from "@tremor/react";
import { useState } from "react";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

export function SettingsNotifications() {
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: "new-booking",
      title: "New Bookings",
      description: "Get notified when a new booking is made",
      enabled: true,
    },
    {
      id: "booking-update",
      title: "Booking Updates",
      description: "Get notified when a booking is modified or cancelled",
      enabled: true,
    },
    {
      id: "check-in",
      title: "Check-in Alerts",
      description: "Get notified when guests are due to check in",
      enabled: true,
    },
    {
      id: "check-out",
      title: "Check-out Alerts",
      description: "Get notified when guests are due to check out",
      enabled: true,
    },
    {
      id: "maintenance",
      title: "Maintenance Requests",
      description: "Get notified about new maintenance requests",
      enabled: false,
    },
    {
      id: "low-inventory",
      title: "Low Inventory",
      description: "Get notified when inventory items are running low",
      enabled: false,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id
        ? { ...notification, enabled: !notification.enabled }
        : notification
    ));
  };

  return (
    <Card>
      <Title>Notification Settings</Title>
      <Text>Manage your notification preferences</Text>

      <div className="mt-6 space-y-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
          >
            <div>
              <Text className="font-medium">{notification.title}</Text>
              <Text className="text-gray-500">{notification.description}</Text>
            </div>
            <Switch
              checked={notification.enabled}
              onChange={() => toggleNotification(notification.id)}
            />
          </div>
        ))}

        <div className="flex justify-end">
          <Button>Save Preferences</Button>
        </div>
      </div>
    </Card>
  );
} 