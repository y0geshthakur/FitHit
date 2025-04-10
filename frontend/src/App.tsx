import { Routes, Route, Outlet } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import MyAccount from "./components/MyAccount";
import GeneralInfo from "./components/GeneralInfo";
import ChangePass from "./components/ChangePass";
import ClientFeedback from "./components/ClientFeedback";
import CoachGeneralInfo from "./components/CoachGeneralInfo";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/"></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="account" element={<MyAccount></MyAccount>}>
          <Route
            path="client"
            element={
              <>
                <Outlet></Outlet>
              </>
            }
          >
            <Route path="info" element={<GeneralInfo></GeneralInfo>}></Route>
            <Route path="pass" element={<ChangePass></ChangePass>}></Route>
          </Route>
          <Route
            path="coach"
            element={
              <>
                <Outlet></Outlet>
              </>
            }
          >
            <Route
              path="info"
              element={<CoachGeneralInfo></CoachGeneralInfo>}
            ></Route>
            <Route path="pass" element={<ChangePass></ChangePass>}></Route>
            <Route
              path="client-feedback"
              element={<ClientFeedback></ClientFeedback>}
            ></Route>
          </Route>
          <Route path="admin"></Route>
        </Route>
        <Route path="*" element={<>Not found</>}></Route>
      </Routes>
    </div>
  );
}
