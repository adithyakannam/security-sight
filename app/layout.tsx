import './globals.css';

export const metadata = {
  title: 'SecureSight - CCTV Monitoring Dashboard',
  description: 'Advanced CCTV monitoring with AI-powered threat detection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-900">
      <body className="bg-gray-900 text-white min-h-screen" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
