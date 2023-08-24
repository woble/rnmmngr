import { Layout } from './components';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
