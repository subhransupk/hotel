export const metadata = {
  title: 'Documents | Hotel Management',
  description: 'Manage and organize hotel documents',
};

export default function DocumentsLayout({
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