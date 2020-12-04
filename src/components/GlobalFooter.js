export default function GlobalFooter() {
  return (
    <footer
      className="max-w-screen my-8"
    >
      <div className="mx-auto text-center prose prose-sm prose-yellow">
        All writings on this site by Sean Clayton are available under the{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
        >
          CC0
        </a>
        &nbsp;license.
        <br />
        <a href="/cc0.txt">You can view the license here.</a>
        <br />
        <a href="https://github.com/sean-clayton/sean.wtf">Git Repo</a>
      </div>
    </footer>
  );
}
