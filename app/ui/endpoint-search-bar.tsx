"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function EndpointsSearchBar({
  placeholder,
  conatinerClassname,
}: {
  placeholder: string;
  conatinerClassname?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <>
      <div className={clsx("relative mb-2", conatinerClassname)}>
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          className="h-12 w-full border-0 pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm  rounded-md bg-gray-100 px-4 py-2.5"
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
    </>
  );
}
