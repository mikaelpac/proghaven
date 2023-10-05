import "server-only";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proghaven",
  description: "Music enthusiast & review platform",
};
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import SupabaseAuthProvider from "@/components/providers/supabase-auth-provider";
import SupabaseProvider from "@/components/providers/supabase-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/footer";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <SupabaseAuthProvider serverSession={session}>
            <Navbar />
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">{children}</div>
            </div>
            <Footer />
          </SupabaseAuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
