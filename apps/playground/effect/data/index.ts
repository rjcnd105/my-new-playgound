import { pipe } from "@effect/data/Function";
import * as ReadonlyArray from "@effect/data/ReadonlyArray";
import * as Str from "@effect/data/String";
const d = Str.takeLeft(6)("12345678"); /*?*/
// const d = Str.takeLeft(6);

// const dd = ReadonlyArray.zipWith([4, 5, 6], (a, b) => {
//   console.log("a", a);
//   console.log("b", b);
// })([1, 2, 3]);
const d3d = ReadonlyArray.intersection((a, b) => {
  console.log("a", a);
  console.log("b", b);
})([4, 5, 6], [1, 2, 3]); /*?*/

const sentences = [
  {
    sentenceId: 336,
    paragraphId: 174,
    sentenceContent:
      "텔레비전은 직접 경험하기 어려운 다양한 사회적 관계를 경험하게 해 주고 일깨워 주는 좋은 인간관계의 장이다. ",
    orderNum: 0,
    paragraphOrderNum: 0,
  },
  {
    sentenceId: 337,
    paragraphId: 174,
    sentenceContent:
      "현대 사회는 다양한 사람들과 관계들이 얽혀 돌아가는 복잡성 때문에, 이에 대한 적절한 대비나 교육 없이는 올바른 사회생활을 기대할 수 없다. ",
    orderNum: 1,
    paragraphOrderNum: 0,
  },
  {
    sentenceId: 338,
    paragraphId: 174,
    sentenceContent:
      "그런데 텔레비전에 등장하는 여러 가지 인간형과 인간관계를 통해서 시청자는 올바른 사회관계의 방향과 실천 과제를 익힐 수 있다. ",
    orderNum: 2,
    paragraphOrderNum: 0,
  },
  {
    sentenceId: 339,
    paragraphId: 175,
    sentenceContent:
      "텔레비전은 올바른 정치적 판단을 할 수 있도록 도와주는 역할을 할 수도 있기 때문에 올바른 민주 시민으로서의 자질과 안목을 기르는 데 도움을 주기도 한다. ",
    orderNum: 0,
    paragraphOrderNum: 1,
  },
  {
    sentenceId: 340,
    paragraphId: 175,
    sentenceContent:
      "전자 민주주의라는 말이 나올 만큼 오늘날의 정치는 텔레비전을 비롯한 각종 대중 매체를 이용하여 이루어진다. ",
    orderNum: 1,
    paragraphOrderNum: 1,
  },
  {
    sentenceId: 341,
    paragraphId: 175,
    sentenceContent:
      "따라서 방송 특히 텔레비전을 잘 활용할 경우에 참다운 민주주의를 실현할 수 있게 된다. ",
    orderNum: 2,
    paragraphOrderNum: 1,
  },
  {
    sentenceId: 342,
    paragraphId: 175,
    sentenceContent:
      "각종 선거 때마다 방송을 통해 입후보자의 면면을 미리 알려 준다든지 갖가지 정치적 화제들에 대한 정보와 국회 의원들의 활동 상황을 제공하기도 한다. ",
    orderNum: 3,
    paragraphOrderNum: 1,
  },
  {
    sentenceId: 343,
    paragraphId: 175,
    sentenceContent:
      "이와 같이 텔레비전은 시청자가 올바른 정치적 입장과 이념을 정립하는 데 도움을 주는 수단이라고 할 수 있다.",
    orderNum: 4,
    paragraphOrderNum: 1,
  },
];
