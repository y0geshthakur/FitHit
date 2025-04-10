import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { userData } from "../types/userData";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ShowEye from "../assets/svgs/ShowEye";
import HideEye from "../assets/svgs/HideEye";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  type data = userData & {
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<data>();
  const handleRegister = async (data: data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userData: userData = {
        fname:
          data.fname.charAt(0).toUpperCase() +
          data.fname.slice(1).toLowerCase(),
        lname:
          data.lname.charAt(0).toUpperCase() +
          data.lname.slice(1).toLowerCase(),
        email: data.email,
        target: data.target,
        activity: data.activity,
        createdAt: new Date(),
        role: "client",
        uid: user.uid,
      };
      await fetch("http://127.0.0.1:5001/fitbit-ef69d/us-central1/api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      alert("Registered");
      reset();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log("Firebase error : ", error.message);
      } else {
        console.log("Unknown error : ", error);
      }
    }
  };
  return (
    <div className="w-1/2 h-full space-y-2 p-30">
      <p className="text-sm text-neutral-700">LET'S GET YOU STARTED</p>
      <h3 className="text-2xl font-semibold text-neutral-700">
        Create an Account
      </h3>

      <form className="mt-10 space-y-4" onSubmit={handleSubmit(handleRegister)}>
        <div className="flex gap-6">
          <div className="w-1/2">
            <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
              <legend className="text-sm text-neutral-700 px-2">
                First Name
              </legend>
              <input
                type="text"
                {...register("fname", { required: "First name is required" })}
                placeholder="Enter your First Name"
                className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
              />
            </fieldset>
            {errors.fname ? (
              <p className="text-red-500">{errors.fname.message}</p>
            ) : (
              <p className="text-gray-400">e.g. Johnson</p>
            )}
          </div>
          <div className="w-1/2">
            <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
              <legend className="text-sm text-neutral-700 px-2">
                Last Name
              </legend>
              <input
                type="text"
                {...register("lname", { required: "Last name is required" })}
                placeholder="Enter your Last Name"
                className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
              />
            </fieldset>
            {errors.lname ? (
              <p className="text-red-500">{errors.lname.message}</p>
            ) : (
              <p className="text-gray-400">e.g. Doe</p>
            )}
          </div>
        </div>
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">Email</legend>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address",
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
                    message:
                      "Must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character",
                  },
                })}
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
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">Your target</legend>
            <select
              defaultValue=""
              className="w-full text-lg text-neutral-700 bg-transparent outline-none px-1 pt-1 pb-2"
              {...register("target", { required: "Target is required" })}
            >
              <option value="" disabled>
                Select your target
              </option>
              <option value="lose">Lose weight</option>
              <option value="gain">Gain weight</option>
              <option value="flexibility">Improve flexibility</option>
              <option value="fitness">General fitness</option>
              <option value="muscle">Build muscle</option>
              <option value="rehab">Rehabilitation/Recovery</option>
            </select>
          </fieldset>
          {errors.target && (
            <p className="text-red-500">{errors.target.message}</p>
          )}
        </div>
        <div className="w-full mt-2">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">
              Preferable Activity
            </legend>
            <select
              defaultValue=""
              className="w-full text-lg text-neutral-700 bg-transparent outline-none px-1 py-1"
              {...register("activity", { required: "Activity is required" })}
            >
              <option value="" disabled>
                Select your activity
              </option>
              <option value="yoga">Yoga</option>
              <option value="climbing">Climbing</option>
              <option value="strength">Strength Training</option>
              <option value="cross">Cross-fit</option>
              <option value="cardio">Cardio Training</option>
              <option value="rehab">Rehabilitation</option>
            </select>
          </fieldset>
          {errors.activity && (
            <p className="text-red-500">{errors.activity.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-lime-500 py-4 mt-2 rounded-xl text-neutral-700"
        >
          Create An Account
        </button>
      </form>
      <div className="flex">
        <p className="mx-auto text-neutral-800">
          Already have an account?{" "}
          <Link to="/login" className="underline">
            LOGIN HERE
          </Link>
        </p>
      </div>
    </div>
  );
}
