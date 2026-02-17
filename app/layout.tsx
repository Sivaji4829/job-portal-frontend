import React from "react";

/**
 * RootLayout - Corporate SaaS CMS Edition
 * * DESIGN PHILOSOPHY:
 * 1. High-Density SaaS UI: Minimalist borders and a Zinc/Indigo palette.
 * 2. Tailwind v4 Integration: Using the latest JIT browser-led compiler.
 * 3. Enterprise Ready: Optimized for long-form data management and real-time dashboards.
 */

export const metadata = {
  title: "HireSync | CMS Dashboard",
  description: "Enterprise hiring management platform with high-density data visualization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Updated Tailwind v4 CDN for professional browser-side processing */}
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        
        {/* Corporate Font: Plus Jakarta Sans - specifically optimized for SaaS interfaces */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* CMS Platform Styling - Focused on high-density light theme */}
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --font-jakarta: 'Plus Jakarta Sans', sans-serif;
            --brand-primary: #4f46e5;
            --zinc-50: #f9fafb;
            --zinc-100: #f4f4f5;
            --zinc-200: #e4e4e7;
          }
          
          body {
            font-family: var(--font-jakarta);
            margin: 0;
            padding: 0;
            /* Corporate SaaS Background: Solid, clean, and focus-oriented */
            background-color: var(--zinc-50);
            color: #0f172a; /* Slate 900 */
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            overflow-x: hidden;
          }

          /* Refined SaaS Glassmorphism for sidebars and top navigation */
          .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(8px);
            border: 1px solid var(--zinc-200);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.02);
          }

          /* Professional Scrollbar for management consoles */
          ::-webkit-scrollbar {
            width: 5px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
          ::-webkit-scrollbar-thumb {
            background: var(--zinc-200);
            border-radius: 20px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #d4d4d8;
          }

          /* Platform Selection Accent */
          ::selection {
            background-color: #e0e7ff;
            color: #3730a3;
          }

          /* Utility to enforce high-density layouts */
          .cms-container {
            max-width: 1600px;
            margin: 0 auto;
          }
        `}} />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Main Application Shell */}
        <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
          {children}
        </main>

        {/* Root portal for data-modals, filter drawers, and CMS command menus */}
        <div id="portal-root" />
      </body>
    </html>
  );
}