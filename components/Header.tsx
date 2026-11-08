
import CurrentDate from "./CurrentDate";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="bg-green-800 p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-1 text-sm text-green-100">
          Sample Ward | <CurrentDate />
        </p>

        <NavLinks />
      </div>
    </header>
  );
}
