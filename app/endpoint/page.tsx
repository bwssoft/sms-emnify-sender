import { fetchEndpoints } from "../lib/actions";
import { EndpointHeader } from "../ui/endpoints-header";
import { EndpointsList } from "../ui/endpoints-list";
import { EndpointsPinned } from "../ui/endpoints-pinned";

export default async function Example() {
  const endpoints = await fetchEndpoints();
  if (!endpoints || endpoints.length === 0) {
    return <p />;
  }
  return (
    <>
      <div className="min-h-full">
        <div className="flex flex-col lg:pl-64">
          <EndpointHeader />

          <EndpointsPinned endpoints={endpoints} />

          <main className="flex-1">
            <EndpointsList endpoints={endpoints} />
          </main>
        </div>
      </div>
    </>
  );
}
