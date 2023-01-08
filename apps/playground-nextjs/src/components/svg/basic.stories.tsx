import type { ComponentMeta, ComponentStory } from "@storybook/react";
import "./style.css";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "svg",
};

const data = [
  { month: "1월", payments: 333823 },
  { month: "2월", payments: 289877 },
  { month: "3월", payments: 207712 },
  { month: "4월", payments: 21550 },
  { month: "5월", payments: 60084 },
];
const svgBorder = { border: "1px solid black" };

export const SvgArea = () => (
  <>
    <p>기본은 width=300px, height=150px 이다.</p>
    <svg></svg>
    <p>viewBox를 넣으면 마치 반응형처럼 된다.</p>
    <svg viewBox="0 0 900 300">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        strokeWidth="3"
        fill="red"
      />
    </svg>
    <p>maxWidth를 주려면 아래처럼 maxWidth를 준 wrapper로 감싼다.</p>
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <svg viewBox="0 0 900 300"></svg>
    </div>
  </>
);

export const Line = () => (
  <>
    <svg width={300} height={300}>
      <line
        x1="50"
        y1="45"
        x2="140"
        y2="225"
        stroke="black"
        strokeWidth="3"
        strokeOpacity={0.7}
      />
    </svg>
    <div>
      <img style={{ width: 350 }} src="images/line.png" />
    </div>
  </>
);

export const Rect = () => (
  <>
    <svg width={500} height={500}>
      <rect x="260" y="25" width="120" height="60" fill="#6ba5d7" />
      <rect
        x="260"
        y="100"
        width="120"
        height="60"
        rx="20"
        ry="20"
        fill="#6ba5d7"
      />
      <rect
        x="260"
        y="175"
        width="60"
        height="60"
        fill="transparent"
        stroke="#6ba5d7"
      />
    </svg>
  </>
);

export const Path = () => (
  <div>
    <p>path: M으로 시작점을 찍고 H(x축), V(y축)으로 이동</p>
    <svg width="100" height="100">
      <path
        d="M10 10 H30 V30 H50 V50 H70 V70 H90 V90"
        stroke-width="3"
        stroke="#f00"
        fill="none"
      ></path>
    </svg>
    <p>
      L로 x,y를 한번에 이동시킬 수 있다.
      <br />
      마지막에 Z를 쓰면 처음 시작점(M)으로 마지막 선을 잇는다.
    </p>
    <svg width="100" height="100">
      <path
        d="M10,10 L25,50 L50,25 L75,50 L50,75 Z"
        stroke-width="3"
        stroke="#f00"
        fill="none"
      ></path>
    </svg>
    <hr />
    <p>
      <strong>베지어 곡선 방법1 - C</strong>
    </p>
    <br />
    C x1 y1, x2 y2, x y<br />
    C로 x1 y2, x2 y2는 곡선을 나타내기 위한 것이고. x, y는 이을 점이다.
    <br />
    처음 x1, y1는 시작점이 적용될 커브 기준 점.
    <br />
    두번째 x2, y2는 끝점이 적용될 커브 기준 점.
    <br />
    <svg width="100" height="100">
      <path
        d="M10 30 C 40 50, 60 50, 90 30"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
      <path
        d="M10 70 C 40 50, 60 50, 90 70"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
        stroke-dasharray="4"
      />
    </svg>
    <hr />
    <p>
      <strong>베지어 곡선 방법2 - S</strong>
    </p>
    <br />
    S x2 y2, x y (S나 C뒤에 오는 경우 시작 점을 생략한다. dx2 dy2, dx dy).
    시작으로 쓰거나, C뒤에로 많이 씀<br />
    즉 C에서 x1 y1가 사라지고 S(이전 점의 x2, y2의 reverse. 생략됨) x2 y2, x y
    처럼 된다고 보면 된다. <br />
    2번째 선을 보면 S를 똑같이 줬음에도 두번째 커브가 더 강하다. 두번째 커브의
    이전 점의 곡선이 먹어서 중간 지점으로 했을때 더 왼쪽에 쏠리게 먹은 것.
    <br />
    x2 y2에 가상의 점을 하나 찍었다 생각하고 이전 점과 끝점(x, y)가 해당 x2,
    y2방향으로 균일하게 휜다.
    <br />
    <svg width="100" height="100">
      <path
        d="M10 20 S50 50, 90 20"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
      <path
        d="M10 50 S30 30, 50 50 S70 70, 90 50"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
      <path
        d="M10 70 C20 60, 40 60, 50 70 S80 80, 90 70"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
    </svg>
    <hr />
    <p>
      <strong>베지어 곡선 방법3 - Q</strong>
    </p>
    <br />
    Q x1 y1, x y (혹은 q dx1 dy1, dx dy)
    <br />
    2차원 C라고 보면 됨<br />
    <svg width="100" height="100">
      <path
        d="M10 30 Q 50 0 90 30"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
      <path
        d="M10 50 Q 30 30 50 50 Q 70 30 90 50"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
    </svg>
    <p>
      <strong>T(Q랑 세트)</strong>
    </p>
    <br />
    T x y<br />
    2차원 S라고 보면 됨 (독단으로 쓸 수 없는)
    <br />
    <svg width="100" height="100">
      <path
        d="M10 30 Q 50 0 90 30"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
      <path
        d="M10 50 Q 30 30 50 50 T 90 50"
        stroke-width="3"
        stroke="#f00"
        fill="transparent"
      />
    </svg>
    <hr />
    <p>
      <strong>베지어 곡선 방법4 - 호</strong>
    </p>
    <br />
    A rx ry x축-회전각 큰-호-플래그 쓸기-방향-플래그 x y<br />
    A rx ry x축-회전각 큰-호-플래그 쓸기-방향-플래그 dx dy
    <br />
    <a href="https://codepen.io/lingtalfi/pen/yaLWJG">
      https://codepen.io/lingtalfi/pen/yaLWJG
    </a>
    <br />
    <br />
    <br />
    <h2>Style, with CSS</h2>
    <br />
    hover해보세요
    <br />
    transition이 먹지 않음
    <br />
    <svg width="400" height="280" id="stroke-linecap">
      <text x="20" y="15" font-size="15">
        {`hover: stroke-linecap="butt", stroke-linejoin="miter" (default)`}
      </text>
      butt: 두 끝점을 넘어 확장하지 않음
      <polyline
        id="p1"
        points="40 80 80 40 120 80"
        stroke="black"
        stroke-width="20"
        fill="none"
      />
      <text x="20" y="110" font-size="15">
        {`hover: stroke-linecap="square", stroke-linejoin="bevel"`}
      </text>
      <polyline
        id="p2"
        points="40 160 80 120 120 160"
        stroke="black"
        stroke-width="20"
        fill="none"
      />
      <text x="20" y="190" font-size="15">
        {`hover: stroke-linecap="round", stroke-linejoin="round"`}
      </text>
      <polyline
        id="p3"
        points="40 240 80 200 120 240"
        stroke="black"
        stroke-width="20"
        fill="none"
      />
    </svg>
  </div>
);

export const Group = () => (
  <div>
    <svg width={500} height={300}>
      <text x={30} y={30}>
        {`그룹을 움직일 때는 transform="translate(x, y)"를 사용한다.`}
      </text>
      <g transform="translate(260,175)">
        <rect x="0" y="0" width="60" height="60" />
        <text x="0" y="85">
          rect
        </text>
      </g>
    </svg>

    <svg width={500} height={300}>
      <text x={30} y={30}>
        {`그룹의 유용한 속성은 자식이 속성을 상속한다는 것이다.`}
      </text>
      <g fill="#636466" style={{ fontSize: 16, fontFamily: "monospace" }}>
        <text x="30" y="200">
          {`textAnchor='start'`}
        </text>
        <text x="230" y="110" style={{ textAnchor: "middle" }}>
          {`textAnchor='middle'`}
        </text>
        <text x="430" y="200" style={{ textAnchor: "end" }}>
          {`textAnchor='end'`}
        </text>
      </g>
    </svg>
  </div>
);

export const Sample = () => (
  <div style={{ width: "100%", maxWidth: 1200, margin: "0 auto" }}>
    <svg viewBox="0 0 900 300">
      <line x1="50" y1="45" x2="140" y2="225" stroke="black" />

      <rect x="260" y="25" width="120" height="60" fill="#6ba5d7" />
      <rect
        x="260"
        y="100"
        width="120"
        height="60"
        rx="20"
        ry="20"
        fill="#6ba5d7"
      />
      <g transform="translate(260, 175)">
        <rect
          x="0"
          y="0"
          width="60"
          height="60"
          fill="transparent"
          stroke="#6ba5d7"
        />
        <text x="0" y="85">
          rect
        </text>
      </g>

      <circle
        cx="530"
        cy="80"
        r="50"
        fill="none"
        stroke="#81c21c"
        stroke-
        width="3"
      />
      <ellipse cx="530" cy="205" rx="50" ry="30" fill="#81c21c" />

      <path
        d="M680 150 C 710 80, 725 80, 755 150 S 810 220, 840 150"
        fill="none"
        stroke="#773b9a"
        stroke-width="3"
      />

      <g fill="#636466" style={{ fontSize: 16 }}>
        <text x="30" y="200">
          {`textAnchor='start'`}
        </text>
        <text x="230" y="110" style={{ textAnchor: "middle" }}>
          {`textAnchor='middle'`}
        </text>
        <text x="430" y="200" style={{ textAnchor: "end" }}>
          {`textAnchor='end'`}
        </text>
      </g>
    </svg>
  </div>
);
