import { createFileRoute } from "@tanstack/react-router";
import { PolicyForm } from "@/components/PolicyForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NIS2 Access Policy Generator — KMO Compliance Tool" },
      { name: "description", content: "Genereer professionele NIS2-conforme Access Control Policy documenten voor uw KMO." },
    ],
  }),
});

function Index() {
  return <PolicyForm />;
}
