"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavbarProps = {
  openSidebar(): void
}

export function Navbar({ openSidebar }: NavbarProps) {
  const pathname = usePathname();

  const titleMapped = useMemo(() => {
    if (pathname.includes("/endpoint")) return "Endpoints";
    if (pathname.includes("/docs")) return "Documentação";
    if (pathname.includes("/message") && !pathname.includes("/endpoint"))
      return "Mensagens";
    if (pathname.includes('/profile')) return 'Meu usuário'
    if (pathname.includes("/")) return "Dashboard";

    return pathname;
  }, [pathname]);

  return (
    <>
      {/* Search header */}
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
        <button
          type="button"
          onClick={openSidebar}
          className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex flex-1">
            <form className="flex w-full md:ml-0" action="#" method="GET">
              <label htmlFor="search-field" className="sr-only">
                Search
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search-field"
                  name="search-field"
                  className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 focus:placeholder:text-gray-400 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Page title & actions */}
      <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
            {titleMapped}
          </h1>
        </div>
      </div>
    </>
  );
}
