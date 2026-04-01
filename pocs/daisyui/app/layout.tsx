import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DaisyUI + Next.js Dashboard",
  description: "A showcase of DaisyUI components in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Runs before paint — prevents theme flash on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}