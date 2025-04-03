'use client'

import { Card, Title, Text, Button, Badge } from "@tremor/react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected";
  icon: string;
}

export function SettingsIntegrations() {
  const [integrations] = useState<Integration[]>([
    {
      id: "stripe",
      name: "Stripe",
      description: "Payment processing and subscription management",
      status: "connected",
      icon: "💳",
    },
    {
      id: "mailchimp",
      name: "Mailchimp",
      description: "Email marketing automation",
      status: "disconnected",
      icon: "📧",
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Website traffic and user behavior analytics",
      status: "connected",
      icon: "📊",
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team communication and notifications",
      status: "connected",
      icon: "💬",
    },
    {
      id: "zapier",
      name: "Zapier",
      description: "Workflow automation with other apps",
      status: "disconnected",
      icon: "⚡",
    },
  ]);

  return (
    <Card>
      <Title>Integrations</Title>
      <Text>Connect and manage third-party services</Text>

      <div className="mt-6 space-y-6">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{integration.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <Text className="font-medium">{integration.name}</Text>
                  <Badge
                    color={integration.status === "connected" ? "green" : "gray"}
                  >
                    {integration.status}
                  </Badge>
                </div>
                <Text className="text-gray-500">{integration.description}</Text>
              </div>
            </div>
            <Button
              variant={integration.status === "connected" ? "secondary" : "primary"}
            >
              {integration.status === "connected" ? "Manage" : "Connect"}
            </Button>
          </div>
        ))}

        <div className="flex justify-end">
          <Button variant="secondary">Check for Updates</Button>
        </div>
      </div>
    </Card>
  );
} 