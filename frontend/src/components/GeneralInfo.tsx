import { useForm } from "react-hook-form";
import { userData } from "../types/userData";
import { useEffect, useState } from "react";

export default function GeneralInfo() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userData>();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedData: userData = JSON.parse(userInfo);
        reset(parsedData);
        if (parsedData.fname) {
          setFname(parsedData.fname);
        }
        if (parsedData.lname) {
          setLname(parsedData.lname);
        }
        if (parsedData.role) {
          setRole(parsedData.role);
        }
        if (parsedData.email) {
          setEmail(parsedData.email);
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage", error);
      }
    } else {
      console.log("userInfo is not present in the local storage");
    }
  }, [reset]);

  const handleChange = async (data: userData) => {
    const id = localStorage.getItem("userDocId");

    try {
      const res = await fetch(
        `http://127.0.0.1:5001/fitbit-ef69d/us-central1/api/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) throw new Error("Failed to update user info");

      localStorage.setItem("userInfo", JSON.stringify(data));
      //   console.log("Updated userInfo:", localStorage.getItem("userInfo"));
      alert("Saved Successfully");
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  return (
    <>
      <form
        className="w-1/2 mx-auto space-y-6"
        onSubmit={handleSubmit(handleChange)}
      >
        <div>
          Name: {fname} {lname} ({role})<br></br>
          Email: {email}
        </div>
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
          Save Changes
        </button>
      </form>
    </>
  );
}
