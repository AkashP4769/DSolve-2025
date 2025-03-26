import AuthContextProvider from "./context/AuthContextProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black" >
      <div className="bg-fuchsia-900 h-[100vh] flex justify-center items-center"> 
      <div className="bg-white w-[90%] h-[90vh] rounded-lg shadow-lg items-center justify-center flex">
      
         <AuthContextProvider>
          {children}
        </AuthContextProvider>
      
      </div>
      </div>
      </body>
    </html>
  );
}
