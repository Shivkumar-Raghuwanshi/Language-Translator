import Link from "next/link";
import { Languages } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Languages className="w-10 h-10" />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Link href="https://github.com/Shivkumar-Raghuwanshi/Language-Translator">
            <FaGithub className="w-8 h-8" />
          </Link>
        </div>
      </div>
    </div>
  );
};
