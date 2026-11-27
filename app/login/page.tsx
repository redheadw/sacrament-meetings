
import { Suspense } from "react";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams: Promise<{
    error?: string;
  }>;
}

async function LoginError({
  searchParams,
}: LoginPageProps) {
  const params = await searchParams;

  if (!params.error) {
    return null;
  }

  return (
    <p
      role="alert"
      className="mb-6 rounded-lg border border-red-300 bg-red-50 p-3 text-red-800"
    >
      {params.error === "invalid"
        ? "Invalid email or password. Please try again."
        : "Unable to sign in. Please try again later."}
    </p>
  );
}

export default function LoginPage({
  searchParams,
}: LoginPageProps) {
  async function login(formData: FormData) {
    "use server";

    try {
      await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/meetings",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.type === "CredentialsSignin") {
          redirect("/login?error=invalid");
        }

        redirect("/login?error=failed");
      }

      throw error;
    }
  }

  return (
    <section className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-3xl font-bold text-green-900">
        Administrator Login
      </h1>

      <p className="mb-6 text-gray-700">
        Sign in to manage sacrament meetings.
      </p>

      <Suspense fallback={null}>
        <LoginError searchParams={searchParams} />
      </Suspense>

      <form action={login} className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-semibold"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block font-semibold"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded border border-gray-300 p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
        >
          Sign In
        </button>
      </form>
    </section>
  );
}
