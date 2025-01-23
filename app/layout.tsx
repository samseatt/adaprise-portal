export const metadata = {
  title: 'Adaprise Portal',
  description: 'Welcome to the Adaprise Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            {/* Add your navigation here */}
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          {/* Add your footer here */}
        </footer>
      </body>
    </html>
  );
}
