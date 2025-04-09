import { Link, Outlet } from "react-router-dom";
// import ChangePass from "./ChangePass";
// import GeneralInfo from "./GeneralInfo";

export default function MyAccount() {
  return (
    <div>
      <Link to={"info"}>General Information</Link>
      <Link to={"pass"}>Change Password</Link>
      <Outlet></Outlet>
      {/* <GeneralInfo></GeneralInfo> */}
      {/* <ChangePass></ChangePass> */}
    </div>
  );
}
