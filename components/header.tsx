import { SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./icons";

export const Header = () => {
  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="flex items-center justify-around max-w-6xl mx-auto">
        <div className="flex items-center p-2 flex-1">
          <Image
            src="/logo.svg"
            width={40}
            height={40}
            alt="logo"
            className="rounded-lg"
          />
          <form className="flex items-center space-x-1 bg-gray-100 p-2 rounded-md flex-1 mx-2 max-w-96">
            <SearchIcon className="size-4 ml-2 mr-1" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent flex-1 outline-none mr-2"
            />
          </form>
        </div>
        <div className="flex items-center">
          <Link
            href="/"
            className="icon hidden md:flex border-b-2 border-black text-black"
          >
            <Icons.home className="size-6" />
            <p>Home</p>
          </Link>
          <Link href="/" className="icon hidden md:flex">
            <Icons.users className="size-6" />
            <p>Network</p>
          </Link>
          <Link href="/" className="icon hidden md:flex">
            <Icons.briefcase className="size-6" />
            <p>Jobs</p>
          </Link>
          <Link href="/" className="icon hidden md:flex">
            <Icons.message className="size-6" />
            <p>Messaging</p>
          </Link>
          <Link href="/" className="icon hidden md:flex">
            <Icons.bell className="size-6" />
            <p>Notifications</p>
          </Link>
        </div>
      </div>
    </header>
  );
};
