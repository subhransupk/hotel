export const metadata = {
  title: 'Security | Hotel Management',
  description: 'Monitor and manage hotel security systems',
};

export default function SecurityLayout({
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