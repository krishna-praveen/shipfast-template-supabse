import Image from "next/image";
import TestimonialsAvatars from "./TestimonialsAvatars";
import config from "@/config";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">
        <p className="text-lg opacity-80 leading-relaxed">
          A quick way to create polls and share them with anyone.
        </p>
          <button className="btn btn-primary btn-wide items-center">
            Get {config.appName}
          </button>
      </div>
    </section>
  );
};

export default Hero;
