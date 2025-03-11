export const metadata = {
  title: 'Payroll Management | Hotel Management',
  description: 'Manage staff salaries, payroll processing, and payment history',
};

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
} 