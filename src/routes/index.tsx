import { createFileRoute } from "@tanstack/react-router";
import { PolicyForm } from "@/components/PolicyForm";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NIS2 Policy Generator" },
      { name: "description", content: "Genereer NIS2-conforme beleidsdocumenten voor uw KMO." },
    ],
  }),
});

function Index() {
  return <PolicyForm />;
}
