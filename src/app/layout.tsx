import { ReactNode } from "react";
import './globals.css'; // Import global CSS if needed

export const metadata = {
  title: 'Cricket Score Counter',
  description: 'A simple cricket score counter application',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div className=" bg-gray-100">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
