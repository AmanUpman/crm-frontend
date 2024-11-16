import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";


// Ensure BrowserRouter wraps everything
createRoot(document.getElementById("root")).render(
          <App />
);
