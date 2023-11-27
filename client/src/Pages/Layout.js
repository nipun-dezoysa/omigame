import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-[100vh]">
      <div className="bg-white ">
        <div class="sticky w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <h1 className="text-xl font-semibold text-black">
            OMI
            <span class="bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
              GAME
            </span>
          </h1>
        </div>
      </div>
      <Outlet />
      <footer class="bg-white  dark:bg-gray-800">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              OMIGAME™
            </a>
            . All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
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
