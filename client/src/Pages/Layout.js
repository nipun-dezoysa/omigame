import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-sm">
        <div class="sticky w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
          <Link to="/">
            <h1 className="text-xl font-semibold text-black">
              OMI
              <span class="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
                GAME
              </span>
            </h1>
          </Link>
          <TiThMenu />
        </div>
      </div>
      <Outlet />
      <footer class="bg-gray-800 mt-auto">
        <div class="w-full mx-auto max-w-screen-xl p-2 px-4 md:p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm  sm:text-center text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              OMIGAME™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
