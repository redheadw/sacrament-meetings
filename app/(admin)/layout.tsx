
import { Suspense, type ReactNode } from "react";
import { connection } from "next/server";
import { requireApprovedAdmin } from "@/lib/require-admin";
import SignOutButton from "@/components/SignOutButton";

async function ProtectedAdminContent({
  children,
}: {
  children: ReactNode;
}) {
  await connection();
  await requireApprovedAdmin();

  return (
    <>
      <div className="mb-4 flex justify-end">
        <SignOutButton />
      </div>

      {children}
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl p-6">
      <div className="mb-6 border-b border-green-200 pb-4">
        <h2 className="text-2xl font-bold text-green-900">
          Meeting Administration
        </h2>

        <p className="mt-2 text-gray-700">
          Meeting management tools for ward leaders.
        </p>
      </div>

      <Suspense fallback={<p>Checking administrator access...</p>}>
        <ProtectedAdminContent>
          {children}
        </ProtectedAdminContent>
      </Suspense>
    </section>
  );
}
