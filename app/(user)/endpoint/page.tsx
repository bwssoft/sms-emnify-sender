import { fetchEndpoints } from "@/app/lib/actions";
import { EndpointsList } from "@/app/ui/endpoints-list";
import { EndpointsPinned } from "@/app/ui/endpoints-pinned";

export default async function Example() {
  const endpoints = await fetchEndpoints();
  if (!endpoints || endpoints.length === 0) {
    return <p />;
  }
  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col">
          <EndpointsPinned endpoints={endpoints} />

          <main className="flex-1">
            <EndpointsList endpoints={endpoints} />
          </main>
        </div>
      </div>
    </>
  );
}
