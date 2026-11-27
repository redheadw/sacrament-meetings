
import Link from "next/link";
import Image from "next/image";
import templeImage from "./opengraph-image.png";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white p-8 shadow-md">
        <h1 className="text-3xl font-bold text-green-900">
          Welcome to the Sacrament Meeting Planner
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Plan, organize, and view weekly sacrament meeting
          programs for Lake Valley Ward.
        </p>

        <p className="mt-3 text-gray-600">
          Browse upcoming meetings, review hymns and speakers,
          and prepare meeting agendas in one convenient place.
        </p>

        <Link
          href="/meetings"
          className="mt-6 inline-block rounded-lg bg-green-800
                     px-6 py-3 font-semibold text-white
                     hover:bg-green-700"
        >
          View Meetings
        </Link>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-green-900">
          Weekly Worship
        </h2>

        <Image
          src={templeImage}
          alt="Oklahoma City Oklahoma Temple"
          sizes="(max-width: 768px) 100vw, 900px"
          className="mx-auto mb-4 h-auto w-full rounded-lg shadow-sm"
        />

        <p className="text-center text-gray-700">
          Bringing our ward together through worship,
          music, prayer, and service.
        </p>
      </section>
    </div>
  );
}
