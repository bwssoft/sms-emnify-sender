"use client";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

type Breadcrumb = {
  name: string;
  href: string;
};

export function Breadcrumbs({
  data,
  root,
}: {
  data: Breadcrumb[];
  root: string;
}) {
  const pathname = usePathname();
  const isOptionInCurrentPathname = useCallback(
    (href: string) => {
      return pathname.includes(href);
    },
    [pathname]
  );
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex items-center space-x-4 px-4 py-4
sm:px-6 lg:px-8"
      >
        <li>
          <div>
            <Link href={root} className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {data.map((d) => (
          <li key={d.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={d.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={
                  isOptionInCurrentPathname(d.href) ? "page" : undefined
                }
              >
                {d.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
