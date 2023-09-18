import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { BooksProvider } from "@/contexts/BooksContext";
import { LoansProvider } from "@/contexts/LoansContext";
import { ShelfProvider } from "@/contexts/ShelfContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <UserProvider>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ThemeProvider>
          <ShelfProvider>
            <LoansProvider>
              <BooksProvider>
                <Component {...pageProps} />
              </BooksProvider>
            </LoansProvider>
          </ShelfProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </UserProvider>
  );
}
