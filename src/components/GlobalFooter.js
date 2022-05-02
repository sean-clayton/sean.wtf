import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="max-w-screen my-8">
      <div className="mx-auto max-w-screen-md text-center">
        <div className="prose prose-sm px-4 prose-yellow max-w-none">
          All writings on this site by Sean Clayton are available under the{" "}
          <Link href="/fpl">
            <a>Free Public License</a>
          </Link>
          .
          <br />
          <a href="/fpl.txt">You can view the license here.</a>
          <br />
          <a href="https://github.com/sean-clayton/sean.wtf">Git Repo</a>
        </div>
      </div>
    </footer>
  );
}
