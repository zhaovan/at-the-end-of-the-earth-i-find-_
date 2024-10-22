import "./globals.css";

export const metadata = {
  title: "at the end of the earth, i find {}",
  description: "experimental text poem for class",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" sizes="any" />
      <body>{children}</body>
    </html>
  );
}
