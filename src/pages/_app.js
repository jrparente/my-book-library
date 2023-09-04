import { BooksProvider } from "@/contexts/BooksContext";
import { LoansProvider } from "@/contexts/LoansContext";
import { UserProvider } from "@/contexts/UserContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <LoansProvider>
      <BooksProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </BooksProvider>
    </LoansProvider>
  );
}
