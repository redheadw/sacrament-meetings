
import type { ReactNode } from "react";

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

      {children}
    </section>
  );
}
