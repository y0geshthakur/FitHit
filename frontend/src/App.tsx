import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import GeneralInfo from "./components/GeneralInfo";
import ChangePass from "./components/ChangePass";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="account" element={<MyAccount></MyAccount>}>
          <Route path="info" element={<GeneralInfo></GeneralInfo>}></Route>
          <Route path="pass" element={<ChangePass></ChangePass>}></Route>
        </Route>
      </Routes>
    </div>
  );
}
