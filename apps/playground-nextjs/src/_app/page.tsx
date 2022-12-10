import Link from "next/link";
import { myStyle } from "./style.css";

export default function Page() {
  return (
    <div className={myStyle}>
      <h1>Page</h1>
      <Link href="/child">child Page</Link>
    </div>
  );
}
