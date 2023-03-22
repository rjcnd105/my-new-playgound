import "./global.css";

import clsx from "clsx";
import localFont from "next/font/local/index.js";
import Link from "next/link.js";

import { type CommonLayoutProps } from "../ty";

export default function RootLayout({ children }: CommonLayoutProps) {
  return (
    <html lang="ko" className={clsx(appleSDGothicNeo.className, "text-[16px]")}>
    <body className="bg-white">
    <main className="flex h-full">
      <div className="basis-56 bg-gray01"></div>
      <div className="flex-1">
        <nav>
          <ul className="flex items-center h-12">
            <li className="h-full flex-1 max-w-[10rem]">
              <Link
                className="flex w-full h-full items-center justify-center"
                href="/issue"
              >
                issue
              </Link>
            </li>
            <li className="h-full flex-1 max-w-[10rem]">
              <Link
                className="flex w-full h-full items-center justify-center"
                href="/repo_search"
              >
                repo_search
              </Link>
            </li>
          </ul>
          <p> page nav</p>
        </nav>
        <div>{children}</div>
      </div>
    </main>
    </body>
    </html>
  );
}

// nextjs font 최적화
const appleSDGothicNeo = localFont({
  display: "swap",
  style: "normal",
  fallback: ["Noto Sans", "Roboto", "sans-serif"],
  src: [
    {
      path: "../assets/fonts/AppleSDGothicNeoR.woff2",
      weight: "400"
    },
    {
      path: "../assets/fonts/AppleSDGothicNeoM.woff2",
      weight: "500"
    },
    {
      path: "../assets/fonts/AppleSDGothicNeoB.woff2",
      weight: "700"
    }
  ]
});
