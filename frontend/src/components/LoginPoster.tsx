import loginPoster from "../assets/LoginPoster.png";

export default function LoginPoster() {
  return (
    <div>
      <figure className="w-full h-full py-4 relative">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src={loginPoster}
          alt="Login Poster"
        />
        <figcaption className="absolute inset-0 flex px-10 items-end bottom-[15%]">
          <p className="text-white text-4xl text-start">
            “The path to triumph is paved with the{" "}
            <span className="text-lime-500">strength to train hard</span> and
            the perseverance to{" "}
            <span className="text-lime-500">rise each time you fall</span>.”
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
