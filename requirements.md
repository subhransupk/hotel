Hotel Management SaaS - Complete Project Structure
1. System Architecture
HOTEL SAAS
├── apps/
│   ├── web/                 # Next.js web application
│   └── api/                 # Backend API services
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── database/           # Database schemas and migrations
│   └── shared/             # Shared utilities and types
2. Core Modules & Features
A. Authentication & User Management
interface User {
  id: string;
  hotelId: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  status: UserStatus;
  lastLogin?: Date;
}

enum UserRole {
  HOTEL_OWNER = 'HOTEL_OWNER',
  MANAGER = 'MANAGER',
  RECEPTIONIST = 'RECEPTIONIST',
  HOUSEKEEPER = 'HOUSEKEEPER',
  MAINTENANCE = 'MAINTENANCE',
  STAFF = 'STAFF'
}
B. Lead Management System
interface Lead {
  id: string;
  hotelId: string;
  status: LeadStatus;
  source: LeadSource;
  priority: LeadPriority;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  requirements: {
    checkInDate?: Date;
    checkOutDate?: Date;
    numberOfRooms?: number;
    numberOfGuests?: number;
    roomType?: RoomCategory[];
    budget?: number;
    specialRequests?: string;
  };
  activities: LeadActivity[];
  assignedTo: string;
  followUpDate: Date;
  notes: LeadNote[];
  attachments?: Attachment[];
  createdAt: Date;
  updatedAt: Date;
  convertedToBooking?: string; // Booking ID if converted
}

enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  NEGOTIATING = 'NEGOTIATING',
  CONVERTED = 'CONVERTED',
  LOST = 'LOST'
}

enum LeadSource {
  WEBSITE = 'WEBSITE',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  WALK_IN = 'WALK_IN',
  REFERRAL = 'REFERRAL',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA'
}
C. Room Management
interface Room {
  id: string;
  hotelId: string;
  number: string;
  category: RoomCategory;
  status: RoomStatus;
  floor: number;
  amenities: Amenity[];
  maintenanceHistory: MaintenanceRecord[];
  currentBooking?: string;
  price: {
    basePrice: number;
    taxRate: number;
    additionalCharges: AdditionalCharge[];
  };
}

enum RoomStatus {
  VACANT = 'VACANT',
  OCCUPIED = 'OCCUPIED',
  MAINTENANCE = 'MAINTENANCE',
  CLEANING = 'CLEANING',
  RESERVED = 'RESERVED'
}
D. Booking Management
interface Booking {
  id: string;
  hotelId: string;
  guestInfo: GuestInformation;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: BookingStatus;
  source: BookingSource;
  paymentStatus: PaymentStatus;
  specialRequests?: string[];
  isGroupBooking: boolean;
  groupSize?: number;
  totalAmount: number;
  additionalCharges: AdditionalCharge[];
  cancellationInfo?: CancellationInfo;
}
E. Guest Management
interface GuestInformation {
  id: string;
  hotelId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idType: IdType;
  idNumber: string;
  address: Address;
  preferences?: GuestPreference[];
  bookingHistory: BookingHistory[];
  vipStatus?: VipStatus;
  notes?: string[];
}
F. Service Management
interface ServiceRequest {
  id: string;
  hotelId: string;
  type: ServiceType;
  status: RequestStatus;
  priority: Priority;
  roomId: string;
  guestId: string;
  description: string;
  assignedTo: string;
  createdAt: Date;
  completedAt?: Date;
  feedback?: ServiceFeedback;
}
G. Staff Management
interface StaffMember {
  id: string;
  hotelId: string;
  userId: string;
  department: Department;
  position: Position;
  schedule: WorkSchedule[];
  skills: Skill[];
  assignments: Assignment[];
  performance: PerformanceMetric[];
}
3. Application Structure
web/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── leads/              # New Lead Management Module
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   ├── create/
│   │   └── reports/
│   ├── rooms/
│   ├── bookings/
│   ├── guests/
│   ├── services/
│   ├── staff/
│   ├── reports/
│   └── settings/
├── components/
│   ├── leads/             # Lead Management Components
│   │   ├── LeadCard.tsx
│   │   ├── LeadForm.tsx
│   │   ├── LeadList.tsx
│   │   ├── LeadFilters.tsx
│   │   └── LeadActivity.tsx
│   ├── rooms/
│   ├── bookings/
│   ├── dashboard/
│   └── shared/
└── features/
    ├── auth/
    ├── leads/             # Lead Management Features
    ├── rooms/
    ├── bookings/
    └── reports/
4. Key Features by Module
Dashboard
Overview metrics
Today's activities
Pending tasks
Quick actions
Recent leads and bookings
Lead Management
Lead capture form
Lead tracking board
Follow-up reminders
Lead qualification
Lead to booking conversion
Activity tracking
Lead reports and analytics
Email/SMS integration
Task assignments
Document attachments
Room Management
Room status board
Category management
Pricing management
Maintenance tracking
Room blocking
Housekeeping status
Booking Management
New booking creation
Check-in/check-out
Group bookings
Calendar view
Rate management
Booking modifications
Cancellation handling
Service Management
Room service tracking
Housekeeping schedule
Maintenance requests
Task assignments
Service status tracking
Staff Management
Staff scheduling
Task assignments
Performance tracking
Shift management
Leave management
Reporting & Analytics
Occupancy reports
Revenue reports
Lead conversion metrics
Service efficiency
Guest statistics
Staff performance
Settings & Configuration
Hotel profile
User management
Role permissions
Email templates
Notification settings
System preferences
5. Subscription Tiers
Basic Tier
Single user access
Basic lead management
Basic room management
Basic booking management
Essential reports
Premium Tier
Unlimited users
Advanced lead management
Complete service management
Advanced analytics
Full financial reporting
Guest history and preferences
Advanced booking features
API access
Priority support








1. Missing Core Modules:
Calendar View: We need a comprehensive calendar showing:
Room bookings
Staff schedules
Housekeeping tasks
Maintenance schedules
Inventory Management: For tracking:
Room supplies
Housekeeping materials
Food & beverage stock
Maintenance supplies
Financial Section Needed:
Revenue management
Expense tracking
Billing and invoices
Payment processing
Financial reports
Guest Experience Features:
Guest feedback system
Review management
Guest preferences tracking
VIP guest management
Special requests handling
Communication Hub:
Internal staff messaging
Guest communication portal
Email/SMS templates
Announcement system
Task assignments





5. Suggested Improvements for Existing Sections:
a) Reports Page:
Add export functionality (PDF, Excel)
More customizable date ranges
Comparative analysis (year-over-year)
Custom report builder
Automated report scheduling
b) Settings Page:
Add email template management
Room type configuration
Rate management
Tax settings
Language preferences
c) Staff Management:
Add shift scheduling
Time tracking
Performance metrics
Training records
Document management
6. Additional Features Needed:
a) Real-time Updates:
Live room status updates
Instant notifications
Real-time occupancy data
Live service request tracking
b) Mobile Optimization:
Mobile app for staff
Mobile check-in/out
Mobile room keys
Mobile maintenance reports
c) Integration Features:
Channel manager integration
Payment gateway integration
Accounting software integration
CRM integration
Analytics and Business Intelligence:
Predictive analytics for demand
Price optimization suggestions
Guest behavior analysis
Revenue forecasting
Market trend analysis
Automation Features:
Automated check-in/out
Automated room assignments
Automated pricing adjustments
Automated maintenance scheduling
Email/SMS automation










Home Page (/)
Hero section with hotel showcase
Key features and benefits
Pricing plans
Testimonials from hotel owners
Call-to-action for sign up
Integration showcase
Contact section
Features Page (/features)
Detailed feature breakdowns
Interactive demos
Use cases
Comparison with competitors
Technical specifications
Integration capabilities
Pricing Page (/pricing)
Pricing tiers (Basic, Professional, Enterprise)
Feature comparison table
FAQ section
Custom quote option
Payment options
Money-back guarantee details
About Us Page (/about)
Company story
Team members
Mission and vision
Company values
Partners and certifications
Office locations
Contact Page (/contact)
Contact form
Support channels
Office addresses
Sales inquiry form
Live chat option
Support hours
Blog Page (/blog)
Industry insights
Product updates
Case studies
Best practices
Hotel management tips
Search and categories
Documentation Page (/docs)
Getting started guide
API documentation
Integration guides
Tutorials
Troubleshooting
FAQs
Demo Page (/demo)
Interactive product demo
Video tutorials
Feature walkthrough
Book a demo form
Live demo scheduling











Recommended Admin Panel Features for Partner Management
Based on this analysis, here are the features that should be included in the admin panel to effectively manage the partner program:
1. Partner Management Dashboard
A dedicated section in the admin panel should be created to:
View aggregate partner statistics
Monitor overall partner program performance
Track key metrics like total partners, active partners, and revenue generated through partners
2. Partner Onboarding & Approval
Review and approve partner applications
Configure initial partner settings
Assign partnership tiers
Provide onboarding resources and training materials
3. Partner Tier Management
Create and modify partnership tiers (Gold, Silver, Bronze, etc.)
Define benefits and commission rates for each tier
Set qualification criteria for tier advancement
Implement tier promotion/demotion rules
4. Commission Structure Management
Configure commission rates by tier, product, or region
Set up special promotional commission rates
Define payout schedules and methods
Approve commission payouts
Generate commission reports
5. Partner Performance Monitoring
Track individual partner performance metrics
Monitor client acquisition rates
Analyze conversion rates from leads to clients
Identify top-performing partners for recognition
6. Marketing Resource Management
Upload and manage marketing materials for partners
Control access to different resources based on partner tier
Track usage and effectiveness of marketing materials
Create and distribute co-branded materials
7. Partner Support Management
View and respond to partner support tickets
Create and update FAQs for the partner knowledge base
Schedule training sessions or webinars
Monitor partner satisfaction metrics
8. Partner Communication Tools
Send announcements to all partners or specific segments
Create and distribute newsletters
Schedule and manage partner events
Provide a communication channel for direct feedback
9. Partner Compliance Monitoring
Ensure partners adhere to brand guidelines
Monitor for potential misrepresentation
Track required certifications or training completion
Flag potential compliance issues
10. Partner Analytics & Reporting
Generate detailed reports on partner program performance
Analyze partner acquisition and retention rates
Track ROI of the partner program
Identify trends and opportunities for program improvement
11. Partner API & Integration Management
Manage partner access to APIs
Monitor API usage by partners
Provide integration support
Control feature access based on partner tier












Authentication System Overview
Let me summarize the authentication system based on your responses:
1. Hotel Management Authentication
User Roles: Owner, Manager, Receptionist, etc. (as in requirements)
Registration: Open registration
Multi-Hotel Support:
Basic plan: One hotel per account
Pro plan: Multiple hotels per account
Fields: First name, Last name, Hotel name, Email, Password
Separate login/register pages: Yes
2. Admin Authentication
Purpose: System administrators
Registration: Likely pre-created or internal process
Fields: Name, Email, Password
Capabilities: Can create partner accounts, manage hotel accounts
Separate login page: Yes
3. Partner Panel Authentication
Types: Technology partner, Hospitality consultant, Enterprise and chains, Others
Registration: Admin-created only (not open registration)
Fields: First name, Last name, Type, Email, Password
Separate login page: Yes
Supabase Implementation Approach
Here's how we can implement this in Supabase cloud:
Database Structure
Auth Users (Supabase built-in table)
Contains all users regardless of type
Email, password (handled by Supabase)
User UUID (primary key)
User Profiles Table
user_id (foreign key to auth.users)
user_type (enum: 'hotel', 'admin', 'partner')
first_name
last_name
created_at
updated_at
Hotel Profiles Table
id (primary key)
owner_id (foreign key to auth.users)
hotel_name
subscription_plan (enum: 'basic', 'pro')
Other hotel details
Hotel Staff Table
id (primary key)
user_id (foreign key to auth.users)
hotel_id (foreign key to hotel_profiles)
role (enum: 'owner', 'manager', 'receptionist', etc.)
permissions (JSON or separate permissions table)
Partner Profiles Table
id (primary key)
user_id (foreign key to auth.users)
partner_type (enum: 'technology', 'hospitality_consultant', 'enterprise_chains', 'others')
Other partner-specific fields
Authentication Flow Implementation
Separate Auth Pages
/auth/hotel/login and /auth/hotel/register
/auth/admin/login (no register page needed)
/auth/partner/login (no register page needed)
Registration Process
Hotel registration: Open, creates user in auth.users + entries in profiles and hotel tables
Partner registration: Admin-only, creates partner profile
Admin registration: Internal process or pre-seeded
Row-Level Security (RLS)
Hotel owners can only access their hotels (or multiple if on pro plan)
Staff can only access assigned hotels
Partners can only access their own data
Admins have broader access
Multi-Hotel Support
Check subscription plan before allowing additional hotels
Admin can override this restriction