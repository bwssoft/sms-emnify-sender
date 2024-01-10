"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import { isAdm } from "@/app/lib/actions";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [tabs, setTabs] = useState([
  { name: "Informações", href: `/endpoint/${params.id}/info` },
  { name: "Conectividade", href: `/endpoint/${params.id}/connectivity` },
  {
    name: "Mensagens",
    href: `/endpoint/${params.id}/message`,
  },])

  useEffect(()=>{
    isAdm().then((value)=>{
      if(value){
        setTabs([
          { name: "Informações", href: `/endpoint/${params.id}/info` },
          { name: "Conectividade", href: `/endpoint/${params.id}/connectivity` },
          {
            name: "Uso e estastisticas de custo",
            href: `/endpoint/${params.id}/usage`,
          },
          {
            name: "Mensagens",
            href: `/endpoint/${params.id}/message`,
          },])
      }
    })
  },[])

  const isOptionInCurrentPathname = useCallback(
    (href: string) => {
      return pathname.includes(href);
    },
    [pathname]
  );

  const breadbrumbs = useMemo(() => {
    return breadBrumbsByPathname(params.id, pathname);
  }, [pathname, params.id]);

  return (
    <div className="min-h-full">
      <Breadcrumbs root="/" data={breadbrumbs} />
      <div>
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

const breadBrumbsByPathname = (id: string, pathname: string) => {
  if (pathname.endsWith("info")) {
    return [
      {
        href: "/endpoint",
        name: "Endpoints",
      },
      {
        href: `/endpoint/${id}/info`,
        name: "Informações",
      },
    ];
  }
  if (pathname.endsWith("message")) {
    return [
      {
        href: "/endpoint",
        name: "Endpoints",
      },
      {
        href: `/endpoint/${id}/message`,
        name: "Mensagem",
      },
    ];
  }
  if (pathname.endsWith("usage")) {
    return [
      {
        href: "/endpoint",
        name: "Endpoints",
      },
      {
        href: `/endpoint/${id}/usage`,
        name: "Usabilidade e custos",
      },
    ];
  }
  if (pathname.endsWith("connectivity")) {
    return [
      {
        href: "/endpoint",
        name: "Endpoints",
      },
      {
        href: `/endpoint/${id}/connectivity`,
        name: "Conectividade",
      },
    ];
  }
  return [];
};
