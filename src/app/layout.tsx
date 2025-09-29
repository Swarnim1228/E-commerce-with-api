import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow">{children}</main>

      </body>
    </html>
  );
}
