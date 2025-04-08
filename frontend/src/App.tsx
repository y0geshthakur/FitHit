import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}
