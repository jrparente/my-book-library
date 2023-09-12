import { BooksProvider } from "@/contexts/BooksContext";
import { LoansProvider } from "@/contexts/LoansContext";
import { ShelfProvider } from "@/contexts/ShelfContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <ShelfProvider>
        <LoansProvider>
          <BooksProvider>
            <UserProvider>
              <Component {...pageProps} />
            </UserProvider>
          </BooksProvider>
        </LoansProvider>
      </ShelfProvider>
    </ThemeProvider>
  );
}
