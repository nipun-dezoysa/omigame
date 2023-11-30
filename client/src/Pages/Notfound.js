import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <div className="w-full flex justify-center px-32 pt-10">
      <div>
        <h1 className="text-5xl font-bold text-gray-500">404 PAGE NOT FOUND</h1>
        <p className="max-w-[600px] font-mono text-gray-500">
          This page doesn't exist, much like a developer's elusive girlfriend.
          We're working on finding both, but it's proving to be quite the
          challenge.
        </p>
        <Link to="/" className="bg-gray-500 p-2 rounded-lg text-slate-200 w-16 flex justify-center mt-2">
          Home
        </Link>
      </div>
    </div>
  );
}
