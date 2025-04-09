import { useForm } from "react-hook-form";
// import { userData } from "../types/userData";
import { useState } from "react";
import HideEye from "../assets/svgs/HideEye";
import ShowEye from "../assets/svgs/ShowEye";
import { auth } from "../firebase";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordCnf, setShowPasswordCnf] = useState(false);
  type data = {
    password: string;
    newPassword: string;
    cnfPassword: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<data>();
  const handleChange = async (data: data) => {
    const user = auth.currentUser;
    if (!user || !user.email) {
      console.error("No user logged in");
      return;
    }

    const { password, newPassword, cnfPassword } = data;

    if (newPassword !== cnfPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      // Update the password
      await updatePassword(user, newPassword);

      alert("Password updated successfully!");
    } catch (error: unknown) {
      const err = error as FirebaseError;

      if (err.code === "auth/wrong-password") {
        alert("Current password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        alert("New password is too weak.");
      } else if (err.code === "auth/requires-recent-login") {
        alert("Please re-login and try again.");
      } else {
        console.error("Error updating password:", err);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <form
        className="w-1/2 mx-auto space-y-6"
        onSubmit={handleSubmit(handleChange)}
      >
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">Password</legend>
            <div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
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
            <legend className="text-sm text-gray-600 px-2">New Password</legend>
            <div>
              <input
                type={showPasswordNew ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                })}
                placeholder="Enter your new password"
                className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
              />
              <button
                type="button"
                onClick={() => setShowPasswordNew(!showPasswordNew)}
                className="absolute right-5 top-2/5 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPasswordNew ? <ShowEye></ShowEye> : <HideEye></HideEye>}
              </button>
            </div>
          </fieldset>
          {errors.newPassword ? (
            <p className="text-red-500">{errors.newPassword.message}</p>
          ) : (
            <p className="text-gray-400">
              At least one capital letter required
            </p>
          )}
        </div>
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">
              Confirm New Password
            </legend>
            <div>
              <input
                type={showPasswordCnf ? "text" : "password"}
                {...register("cnfPassword", {
                  required: "Confirm password is required",
                })}
                placeholder="Enter your confirm password"
                className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
              />
              <button
                type="button"
                onClick={() => setShowPasswordCnf(!showPasswordCnf)}
                className="absolute right-5 top-2/5 transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPasswordCnf ? <ShowEye></ShowEye> : <HideEye></HideEye>}
              </button>
            </div>
          </fieldset>
          {errors.cnfPassword ? (
            <p className="text-red-500">{errors.cnfPassword.message}</p>
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
          Save Changes
        </button>
      </form>
    </div>
  );
}
