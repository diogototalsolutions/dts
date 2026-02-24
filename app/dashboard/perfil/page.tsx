import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="p-6 space-y-2">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <div className="card p-4">
        <div><b>Nome:</b> {session.user?.name ?? "-"}</div>
        <div><b>Email:</b> {session.user?.email ?? "-"}</div>
      </div>
    </div>
  );
}