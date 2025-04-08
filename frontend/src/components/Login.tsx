import LoginForm from "./LoginForm";
import LoginPoster from "./LoginPoster";

export default function Login() {
  return (
    <div className="flex w-screen h-screen px-4 gap-3">
      <LoginForm></LoginForm>
      <LoginPoster></LoginPoster>
    </div>
  );
}
