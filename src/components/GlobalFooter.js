import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="max-w-screen my-8">
      <div className="mx-auto max-w-screen-md text-center">
        <div className="prose prose-sm prose-yellow max-w-none">
          All writings on this site by Sean Clayton are available under the{" "}
          <Link href="/WTFPL-69.420">
            <a>WTFPL-69.420</a>
          </Link>
          &nbsp;license.
          <br />
          <a href="/WTFPL-69.420.txt">You can view the license here.</a>
          <br />
          <a href="https://github.com/sean-clayton/sean.wtf">Git Repo</a>
        </div>
      </div>
    </footer>
  );
}
