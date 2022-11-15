import Link from "next/link";

export default function GlobalFooter() {
  return (
    <footer className="max-w-screen my-8">
      <div className="mx-auto max-w-screen-md text-center">
        <div className="prose prose-sm px-4 prose-yellow max-w-none">
          <div>
            <a href="/pgp-public-key.txt">My PGP Public Key</a>
          </div>
          <div>
            Anyone found copying the content in this website without permission
            will be a real good friend of mine.
          </div>
          <div>
            For those who falsely believe permission is necessary, you can rest
            assured as this website is available under the{" "}
            <Link href="/fpl">
              <a>Free Public License</a>
            </Link>
            .
            <br />
            <a href="/fpl.txt">You can view the license here.</a>
          </div>
          <div>
            <a href="https://github.com/sean-clayton/sean.wtf">Git Repo</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
