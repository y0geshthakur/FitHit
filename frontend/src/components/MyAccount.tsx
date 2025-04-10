import { Link, Outlet } from "react-router-dom";
// import ChangePass from "./ChangePass";
// import GeneralInfo from "./GeneralInfo";

export default function MyAccount() {
  const userInfo = localStorage.getItem("userInfo");
  let role;
  if (userInfo) {
    try {
      const parsedData = JSON.parse(userInfo);
      role = parsedData.role;
    } catch (error) {
      console.error("Error parsing userData from localStorage", error);
    }
  } else {
    console.log("userInfo is not present in the local storage");
  }
  return (
    <div className="flex">
      <div className="w-1/3">
        {role === "client" && (
          <>
            <Link to={`${role}/info`}>General Information</Link>
            <Link to={`${role}/pass`}>Change Password</Link>
          </>
        )}
        {role === "coach" && (
          <>
            <Link to={`${role}/info`}>General Information</Link>
            <Link to={`${role}/client-feedback`}>Client Feedback</Link>
            <Link to={`${role}/pass`}>Change Password</Link>
          </>
        )}
        {role === "admin"}
      </div>
      <div className="w-full">
        <Outlet></Outlet>
      </div>
      {/* <GeneralInfo></GeneralInfo> */}
      {/* <ChangePass></ChangePass> */}
    </div>
  );
}
