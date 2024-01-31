"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function EndpointsSearchBar({
    placeholder,
    conatinerClassname,
    fieldsForSearch = [],
}: {
    placeholder: string;
    conatinerClassname?: string;
    fieldsForSearch?: Array<{ label: string; field: string }>;
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

    const handleChangeType = useDebouncedCallback((type: string) => {
        const params = new URLSearchParams(searchParams);
        if (type) {
            params.set("type", type);
        } else {
            params.delete("type");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    return (
        <>
            <div className={clsx("relative mb-2", conatinerClassname)}>
                <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 lg:left-8 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
                <input
                    className="h-12 w-full border-0 pl-11 lg:pl-16 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm  rounded-md bg-gray-100 px-4 py-2.5"
                    placeholder={placeholder}
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get("query")?.toString()}
                />
                <select
                    id="currency"
                    name="currency"
                    className="absolute top-0 right-4 lg:right-8 h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    onChange={(e) => handleChangeType(e.target.value)}
                >
                    {fieldsForSearch.map((data, key) => (
                        <option value={data.field} key={key}>
                            {data.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
