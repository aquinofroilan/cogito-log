import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui";
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const font = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.variable} antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
