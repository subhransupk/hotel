'use client'

import { Card, Title, Text, TextInput, Button, Switch } from "@tremor/react";
import { useState } from "react";

export function SettingsSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [passwordLastChanged] = useState("2024-01-15");

  return (
    <Card>
      <Title>Security Settings</Title>
      <Text>Manage your account security preferences</Text>

      <div className="mt-6 space-y-6">
        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <Text className="font-medium">Two-Factor Authentication</Text>
            <Text className="text-gray-500">
              Add an extra layer of security to your account
            </Text>
          </div>
          <Switch
            checked={twoFactorEnabled}
            onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
        </div>

        {/* Session Timeout */}
        <div className="space-y-2">
          <Text className="font-medium">Session Timeout</Text>
          <Text className="text-gray-500">
            Set the duration (in minutes) before an inactive session is automatically logged out
          </Text>
          <div className="max-w-xs">
            <TextInput
              value={sessionTimeout}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setSessionTimeout(value);
                }
              }}
              placeholder="Enter timeout in minutes"
            />
          </div>
        </div>

        {/* Password Information */}
        <div className="space-y-2">
          <Text className="font-medium">Password</Text>
          <div className="flex items-center justify-between">
            <Text className="text-gray-500">
              Last changed: {new Date(passwordLastChanged).toLocaleDateString()}
            </Text>
            <Button variant="secondary">Change Password</Button>
          </div>
        </div>

        {/* Login History */}
        <div className="space-y-2">
          <Text className="font-medium">Login History</Text>
          <Text className="text-gray-500">
            View your recent login activity
          </Text>
          <Button variant="secondary">View History</Button>
        </div>

        {/* API Access */}
        <div className="space-y-2">
          <Text className="font-medium">API Access</Text>
          <Text className="text-gray-500">
            Manage API keys and access tokens
          </Text>
          <Button variant="secondary">Manage API Keys</Button>
        </div>

        <div className="flex justify-end">
          <Button>Save Security Settings</Button>
        </div>
      </div>
    </Card>
  );
} 