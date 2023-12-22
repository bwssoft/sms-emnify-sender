import { fetchEndpointsFilteredByName } from "@/app/lib/actions";
import { Breadcrumbs } from "@/app/ui/breadcrumbs";
import EndpointsSearchBar from "@/app/ui/endpoint-search-bar";
import { EndpointsList } from "@/app/ui/endpoints-list";
import { EndpointsPinned } from "@/app/ui/endpoints-pinned";

export default async function Example({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    type?: string;
  };
}) {
  const query = searchParams?.query || "";
  const type = searchParams?.type || undefined;
  const simcards = await fetchEndpointsFilteredByName(query, type);

  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col">
          <EndpointsSearchBar placeholder="Pesquise pelo endpoint." />

          <Breadcrumbs
            root="/"
            data={[
              {
                href: "/endpoint",
                name: "Endpoints",
              },
            ]}
          />
          <EndpointsPinned simcards={simcards.slice(0, 4)} />

          <main className="flex-1">
            <EndpointsList simcards={simcards} />
          </main>
        </div>
      </div>
    </>
  );
}
