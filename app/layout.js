import AuthContextProvider from "./context/AuthContextProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black" >
         <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
