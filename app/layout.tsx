import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <Header />
        <main className="space-y-2.5">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
