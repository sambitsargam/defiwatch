import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const _metadata = {
  title: "DeFi Watch",
  description: "DeFi Watch",
};

export const metadata: Metadata = {
  title: _metadata.title,
  description: _metadata.description,
  openGraph: {
    type: "website",
    title: _metadata.title,
    description: _metadata.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
