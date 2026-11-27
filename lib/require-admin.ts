
import "server-only";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getAdminByEmail } from "@/lib/admin-db";

export async function requireApprovedAdmin() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const admin = await getAdminByEmail(session.user.email);

  if (!admin || !admin.isApproved) {
    throw new Error(
      "Forbidden: Administrator approval is required."
    );
  }

  return admin;
}
