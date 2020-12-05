import { Suspense, useState } from "react";

function IdleComponent({ onClick, url, thumbnail, loading }) {
  return (
    <div
      className="bg-yellow-600 hover:bg-yellow-700 w-full relative text-yellow-800 my-4"
    >
      {thumbnail
        ? <img
          src={thumbnail}
          style={{ margin: 0, mixBlendMode: "multiply" }}
          className="opacity-25 pointer-events-none object-fill object-center w-full"
          alt="Video thumbnail"
        />
        : <div className="w-full h-64" />}
      <a
        target="_blank"
        className="text-lg absolute font-bold h-full top-0 right-0 left-0 bottom-0 w-full flex justify-center items-center"
        rel="noopener noreferrer"
        href={url}
        onClick={onClick}
        style={{
          color: "white",
        }}
      >
        <span
          style={{
            color: "white",
            textShadow: "0 1px 0 black",
          }}
        >
          {loading ? "Loading..." : "Play Embedded Media"}
        </span>
      </a>
    </div>
  );
}

export default function ComponentPlayer({ children, url, thumbnail }) {
  const [open, setOpen] = useState(false);
  const openComponent = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return open
    ? <Suspense
      fallback={<IdleComponent
        loading
        thumbnail={thumbnail}
      />}
    >
      {children}
    </Suspense>
    : <IdleComponent onClick={openComponent} url={url} thumbnail={thumbnail} />;
}
