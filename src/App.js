import logo from "./logo.svg";
import "./App.css";
import { router } from "../src/routes/routes";
import { RouterProvider } from "react-router-dom";
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
