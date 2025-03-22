import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import "./index.css";
import CreateTrip from "./create-trip";
import Header from "./components/custom/Header";
import { toast, Toaster } from "sonner"; 
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <Header />
    <Toaster /> 
    <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>
);
