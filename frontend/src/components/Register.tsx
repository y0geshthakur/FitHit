import LoginPoster from "./LoginPoster";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <div>
      {/* Login */}
      <div className="flex w-screen h-screen px-4 gap-3">
        <RegisterForm></RegisterForm>
        <LoginPoster></LoginPoster>
      </div>
    </div>
  );
}
