"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const router = useRouter();

  const breadcrumbs = [
    { id: 1, name: "Endpoints", href: "/endpoint" },
    {
      id: 2,
      name: "Visualizar endpoint",
      href: `/endpoint/${params.id}`,
    },
  ];
  const tabs: {
    name: string;
    href: string;
  }[] = [
    { name: "Informações", href: `/endpoint/${params.id}/info` },
    { name: "Conectividade", href: `/endpoint/${params.id}/connectivity` },
    {
      name: "Uso e estastisticas de custo",
      href: `/endpoint/${params.id}/usage`,
    },
    {
      name: "Mensagens",
      href: `/endpoint/${params.id}/message`,
    },
  ];

  const isOptionInCurrentPathname = useCallback(
    (href: string) => {
      return pathname.includes(href);
    },
    [pathname]
  );

  return (
    <div className="min-h-full">
      <div className="lg:pl-64">
        <header className="bg-gray-50 py-4 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
            <div className="min-w-0 flex-1">
              <nav aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-2">
                  {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                    <li key={breadcrumb.id}>
                      <div className="flex items-center text-sm">
                        <Link
                          href={breadcrumb.href}
                          className="font-medium text-gray-400 hover:text-gray-200"
                        >
                          {breadcrumb.name}
                        </Link>
                        {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                          <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                          >
                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                          </svg>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </header>

        <main className="pb-16">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 sm:px-0">
              {/* Tabs */}
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="mt-4 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-500"
                  defaultValue={
                    tabs.find((tab) => isOptionInCurrentPathname(tab.href))
                      ?.name
                  }
                  onChange={(e) => router.push(e.target.value)}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name} value={tab.href}>
                      {tab.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px mt-2 flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={clsx(
                          isOptionInCurrentPathname(tab.href)
                            ? "border-purple-500 text-purple-600"
                            : "border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700",
                          "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium"
                        )}
                      >
                        {tab.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            <div className="pb-16 pt-4">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
