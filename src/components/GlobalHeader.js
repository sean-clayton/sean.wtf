import Link from "next/link";

export default function GlobalHeader() {
  return (
    <header className="flex justify-center items-center p-8 text-yellow-900">
      <nav>
        <Link href="/">
          <a className="text-3xl md:text-4xl">
            <h1>sean wtf?</h1>
          </a>
        </Link>
      </nav>
    </header>
  );
}
