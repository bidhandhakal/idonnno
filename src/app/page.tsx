import { headers } from "next/headers";
import { UselessCounterClient } from "@/components/useless-counter";

export default async function Home() {
  const h = await headers();
  const country =
    h.get("x-vercel-ip-country") ??
    h.get("x-country") ??
    h.get("cf-ipcountry") ??
    "??";

  return <UselessCounterClient initialCountry={country} />;
}
