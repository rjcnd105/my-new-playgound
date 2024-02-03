import type { MetaFunction } from "@remix-run/node";
import styled from "styled-components";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const MyItem = styled.div`
 background:#000;  
`

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <MyItem>hihi</MyItem> 
      </ul>
    </div>
  );
}
