import { useForm } from "react-hook-form";
import { coachData } from "../types/coachData";
import { useEffect, useState } from "react";

export default function CoachGeneralInfo() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<coachData>();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsedData: coachData = JSON.parse(userInfo);
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
        if (Array.isArray(parsedData.specialization)) {
          setTags(parsedData.specialization);
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage", error);
      }
    } else {
      console.log("userInfo is not present in the local storage");
    }
  }, [reset]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags((prev) => [...prev, newTag]);
      }
      setInput("");
    } else if (e.key === "Backspace" && !input) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = async (data: coachData) => {
    const id = localStorage.getItem("userDocId");
    data.specialization = tags;

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
            <legend className="text-sm text-gray-600 px-2">Title</legend>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter your title"
              className="w-full text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
            />
          </fieldset>
        </div>
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">About</legend>
            <textarea
              {...register("about", { required: "About is required" })}
              placeholder="Enter your introduction"
              className="w-full h-min text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
            />
          </fieldset>
        </div>
        <div className="w-full">
          <fieldset className="relative border border-gray-300 rounded-xl px-4 pb-1 pt-0.5">
            <legend className="text-sm text-gray-600 px-2">
              Specialization
            </legend>
            <div>
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center bg-gray-200 rounded-full px-2 py-1 text-sm font-medium text-gray-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="ml-2 text-gray-600 hover:text-gray-900"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your specializations"
              className="w-full h-min text-lg text-gray-700 placeholder-gray-400 bg-transparent outline-none py-1 pl-1.5"
            />
          </fieldset>
          {tags.length === 0 && (
            <p className="text-red-500">At least 1 specialization required</p>
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
