export const metadata = {
  title: 'Messages | Hotel Management',
  description: 'Manage your conversations with guests and staff',
};

export default function MessagesLayout({
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