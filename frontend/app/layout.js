import './globals.css';

export const metadata = {
  title: 'Quick Notes',
  description: 'Full stack notes app — Node.js + Next.js 13',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}