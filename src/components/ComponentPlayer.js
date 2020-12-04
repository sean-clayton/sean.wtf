import { useState } from "react";

function IdleComponent({ onClick, url }) {
  return (
    <div className="w-full relative p-24 text-yellow-800">
      <a
        className="absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center bg-yellow-300 hover:bg-yellow-500"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
        onClick={onClick}
      >
        <span>Play Embedded Media</span>
      </a>
    </div>
  );
}

export default function ComponentPlayer({ children, url }) {
  const [open, setOpen] = useState(false);
  const openComponent = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return open ? children : <IdleComponent onClick={openComponent} url={url} />;
}
