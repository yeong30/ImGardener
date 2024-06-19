import { ClientOnly } from "./client";

export function generateStaticParams() {
  return [{ slug: [""] }, { slug: ["test"] }];
}

export default function Page() {
  return <ClientOnly />;
}
