import "./globals.css";
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/NavBar";
import { NotificationProvider } from "./components/NotificationContext";
import Notification from "./components/Notification";

export const metadata = {
  title: "Blog app",
  description: "A blog application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <main className="max-w-3xl mx-auto p-6">
              <Notification />
              {children}
            </main>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
