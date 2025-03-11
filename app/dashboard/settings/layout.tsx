export const metadata = {
  title: "Settings | Dashboard",
  description: "Manage your hotel system settings and preferences",
};

export default function SettingsLayout({
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