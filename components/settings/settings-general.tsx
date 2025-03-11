'use client'

import { Card, Title, Text, TextInput, Select, SelectItem, Button } from "@tremor/react";
import { useState } from "react";

const timezones = [
  { value: "UTC", label: "UTC (GMT+0)" },
  { value: "EST", label: "EST (GMT-5)" },
  { value: "CST", label: "CST (GMT-6)" },
  { value: "PST", label: "PST (GMT-8)" },
  { value: "IST", label: "IST (GMT+5:30)" },
];

const currencies = [
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "JPY", label: "Japanese Yen (¥)" },
  { value: "AUD", label: "Australian Dollar (A$)" },
];

export function SettingsGeneral() {
  const [hotelName, setHotelName] = useState("Grand Hotel");
  const [timezone, setTimezone] = useState("UTC");
  const [currency, setCurrency] = useState("USD");
  const [address, setAddress] = useState("123 Hotel Street");
  const [phone, setPhone] = useState("+1 234 567 8900");
  const [email, setEmail] = useState("contact@grandhotel.com");

  return (
    <Card>
      <Title>General Settings</Title>
      <Text>Manage your hotel's basic information and preferences</Text>

      <div className="mt-6 space-y-6">
        <div className="space-y-2">
          <Text>Hotel Name</Text>
          <TextInput 
            value={hotelName} 
            onChange={(e) => setHotelName(e.target.value)}
            placeholder="Enter hotel name" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text>Timezone</Text>
            <Select value={timezone} onValueChange={setTimezone}>
              {timezones.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Text>Currency</Text>
            <Select value={currency} onValueChange={setCurrency}>
              {currencies.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  {curr.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Text>Address</Text>
          <TextInput 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter hotel address" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text>Phone Number</Text>
            <TextInput 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number" 
            />
          </div>

          <div className="space-y-2">
            <Text>Email Address</Text>
            <TextInput 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email address" 
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </Card>
  );
} 