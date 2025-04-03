'use client'

import { Card, Title, Text, Button, Badge, Select, SelectItem, TextInput, Switch } from "@tremor/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  status: "active" | "inactive";
  lastActive?: string;
  permissions: Permission[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

enum UserRole {
  HOTEL_OWNER = 'HOTEL_OWNER',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  HOUSEKEEPER = 'HOUSEKEEPER',
  MAINTENANCE = 'MAINTENANCE',
  STAFF = 'STAFF'
}

enum Department {
  MANAGEMENT = 'Management',
  FRONT_DESK = 'Front Desk',
  HOUSEKEEPING = 'Housekeeping',
  MAINTENANCE = 'Maintenance',
  FOOD_BEVERAGE = 'Food & Beverage',
  SECURITY = 'Security'
}

const defaultPermissions: Permission[] = [
  {
    id: "view_bookings",
    name: "View Bookings",
    description: "Can view booking details and history",
    enabled: false,
  },
  {
    id: "manage_bookings",
    name: "Manage Bookings",
    description: "Can create, modify, and cancel bookings",
    enabled: false,
  },
  {
    id: "view_rooms",
    name: "View Rooms",
    description: "Can view room status and details",
    enabled: false,
  },
  {
    id: "manage_rooms",
    name: "Manage Rooms",
    description: "Can update room status and details",
    enabled: false,
  },
  {
    id: "view_guests",
    name: "View Guests",
    description: "Can view guest information",
    enabled: false,
  },
  {
    id: "manage_guests",
    name: "Manage Guests",
    description: "Can modify guest information and preferences",
    enabled: false,
  },
  {
    id: "view_reports",
    name: "View Reports",
    description: "Can access reports and analytics",
    enabled: false,
  },
  {
    id: "manage_staff",
    name: "Manage Staff",
    description: "Can manage staff members and their permissions",
    enabled: false,
  },
  {
    id: "manage_settings",
    name: "Manage Settings",
    description: "Can modify system settings and configurations",
    enabled: false,
  },
];

export function SettingsStaff() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@hotel.com",
      role: UserRole.MANAGER,
      department: Department.MANAGEMENT,
      status: "active",
      lastActive: "2024-02-15",
      permissions: defaultPermissions.map(p => ({ ...p, enabled: true })),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.j@hotel.com",
      role: UserRole.RECEPTIONIST,
      department: Department.FRONT_DESK,
      status: "active",
      lastActive: "2024-02-15",
      permissions: defaultPermissions.map(p => ({ ...p, enabled: p.id.startsWith('view_') })),
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike.c@hotel.com",
      role: UserRole.HOUSEKEEPER,
      department: Department.HOUSEKEEPING,
      status: "active",
      lastActive: "2024-02-14",
      permissions: defaultPermissions.map(p => ({ ...p, enabled: p.id.includes('rooms') })),
    },
  ]);

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    role: UserRole.STAFF,
    department: Department.FRONT_DESK,
  });

  const handleUpdateRole = (id: string, role: UserRole) => {
    setStaffMembers(staffMembers.map(staff =>
      staff.id === id ? { ...staff, role } : staff
    ));
  };

  const handleUpdateDepartment = (id: string, department: Department) => {
    setStaffMembers(staffMembers.map(staff =>
      staff.id === id ? { ...staff, department } : staff
    ));
  };

  const handleInviteStaff = () => {
    const newStaffMember: StaffMember = {
      id: (staffMembers.length + 1).toString(),
      ...newStaff,
      status: "active",
      lastActive: new Date().toISOString().split('T')[0],
      permissions: defaultPermissions.map(p => ({ ...p })),
    };
    setStaffMembers([...staffMembers, newStaffMember]);
    setShowInviteForm(false);
    setNewStaff({
      name: "",
      email: "",
      role: UserRole.STAFF,
      department: Department.FRONT_DESK,
    });
  };

  const handleManageAccess = (staffId: string) => {
    setSelectedStaffId(staffId);
    setShowPermissionsModal(true);
  };

  const handleTogglePermission = (staffId: string, permissionId: string) => {
    setStaffMembers(staffMembers.map(staff =>
      staff.id === staffId
        ? {
            ...staff,
            permissions: staff.permissions.map(permission =>
              permission.id === permissionId
                ? { ...permission, enabled: !permission.enabled }
                : permission
            ),
          }
        : staff
    ));
  };

  const selectedStaff = selectedStaffId 
    ? staffMembers.find(staff => staff.id === selectedStaffId)
    : null;

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <Title>Staff Access</Title>
          <Text>Manage staff roles and permissions</Text>
        </div>
        <Button 
          onClick={() => setShowInviteForm(!showInviteForm)}
          variant="secondary"
        >
          Invite Staff Member
        </Button>
      </div>

      {showInviteForm && (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg space-y-4">
          <Title className="text-lg">Invite New Staff Member</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Text>Name</Text>
              <TextInput
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                placeholder="Enter staff name"
              />
            </div>
            <div className="space-y-2">
              <Text>Email</Text>
              <TextInput
                value={newStaff.email}
                onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                placeholder="Enter email address"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <Text>Role</Text>
              <Select 
                value={newStaff.role} 
                onValueChange={(value) => setNewStaff({ ...newStaff, role: value as UserRole })}
              >
                {Object.values(UserRole).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.replace(/_/g, ' ')}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Text>Department</Text>
              <Select 
                value={newStaff.department} 
                onValueChange={(value) => setNewStaff({ ...newStaff, department: value as Department })}
              >
                {Object.values(Department).map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={() => setShowInviteForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteStaff}>
              Send Invitation
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-6">
        {staffMembers.map((staff) => (
          <div
            key={staff.id}
            className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-gray-100 last:border-0 gap-4"
          >
            <div className="space-y-1">
              <Text className="font-medium">{staff.name}</Text>
              <Text className="text-gray-500">{staff.email}</Text>
              <div className="flex items-center space-x-2">
                <Badge color={staff.status === "active" ? "green" : "gray"}>
                  {staff.status}
                </Badge>
                <Text className="text-xs text-gray-500">
                  Last active: {staff.lastActive}
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Text className="text-sm">Role</Text>
                <Select 
                  value={staff.role} 
                  onValueChange={(value) => handleUpdateRole(staff.id, value as UserRole)}
                >
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.replace(/_/g, ' ')}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-2">
                <Text className="text-sm">Department</Text>
                <Select 
                  value={staff.department} 
                  onValueChange={(value) => handleUpdateDepartment(staff.id, value as Department)}
                >
                  {Object.values(Department).map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <Button 
              variant="secondary" 
              size="xs"
              onClick={() => handleManageAccess(staff.id)}
            >
              Manage Access
            </Button>
          </div>
        ))}

        <div className="flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>

      {/* Permissions Modal */}
      {showPermissionsModal && selectedStaff && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Title>Manage Access Permissions</Title>
                    <Text>Manage permissions for {selectedStaff.name}</Text>
                  </div>
                  <button
                    onClick={() => setShowPermissionsModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {selectedStaff.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div>
                        <Text className="font-medium">{permission.name}</Text>
                        <Text className="text-gray-500">{permission.description}</Text>
                      </div>
                      <Switch
                        checked={permission.enabled}
                        onChange={() => handleTogglePermission(selectedStaff.id, permission.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <Button
                  onClick={() => setShowPermissionsModal(false)}
                  className="w-full sm:w-auto sm:ml-3"
                >
                  Save Permissions
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setShowPermissionsModal(false)}
                  className="mt-3 sm:mt-0 w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
} 