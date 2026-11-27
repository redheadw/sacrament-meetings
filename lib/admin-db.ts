
import "server-only";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  isApproved: boolean;
}

export async function getAdminByEmail(
  email: string
): Promise<AdminUser | null> {
  const rows = await sql`
    SELECT
      id,
      name,
      email,
      password_hash AS "passwordHash",
      is_approved AS "isApproved"
    FROM admin_users
    WHERE LOWER(email) = LOWER(${email})
    LIMIT 1
  `;

  if (rows.length === 0) {
    return null;
  }

  return rows[0] as AdminUser;
}
