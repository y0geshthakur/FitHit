import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { userData } from "../types/userData";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ShowEye from "../assets/svgs/ShowEye";
import HideEye from "../assets/svgs/HideEye";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  type data = {
    email: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<data>();
  const handleLogin = async (data: data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userObject = userDoc.data() as userData;
      const userData: userData = {
        fname: userObject.fname,
        lname: userObject.lname,
        email: userObject.email,
        target: userObject.target,
        activity: userObject.activity,
        createdAt: userObject.createdAt,
      };
      alert(`Welcome ${userData.fname} ${userData.lname}`);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log("Login Error : ", error.message);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center w-1/2 h-full px-30 space-y-2">
      <p className="text-sm text-neutral-700">WELCOME BACK</p>
      <h3 className="text-2xl font-semibold text-neutral-700">
        Log In to Your Account
      </h3>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 mt-10">
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">Email</legend>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
              className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
            />
          </fieldset>
          {errors.email ? (
            <p className="text-red-500">{errors.email.message}</p>
          ) : (
            <p className="text-gray-400">e.g. username@domain.com</p>
          )}
        </div>
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">Password</legend>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-2/5 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? <ShowEye></ShowEye> : <HideEye></HideEye>}
              </button>
            </div>
          </fieldset>
          {errors.password ? (
            <p className="text-red-500">{errors.password.message}</p>
          ) : (
            <p className="text-gray-400">
              At least one capital letter required
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-lime-500 py-4 mt-2 rounded-xl text-neutral-700"
        >
          Log In
        </button>
      </form>
      <div className="flex">
        <p className="mx-auto text-neutral-800">
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            CREATE NEW ACCOUNT
          </Link>
        </p>
      </div>
    </div>
  );
}
