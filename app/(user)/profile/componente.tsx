"use server"
import { auth } from "@/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default async function Component() {
  const session = await auth()

  return (
    <div  className="flex items-center space-x-1">
      <p className="text-gray-600 text-[.9em] font-medium">{session?.user.name}</p>
      <UserCircleIcon className="w-5 h-5 text-gray-600" />
    </div>
  );
}

