import * as Record from "fp-ts/Record";
import { Merge, MergeDeep, MergeExclusive } from "type-fest";
import { deepmergeCustom, DeepMergeLeafURI } from "deepmerge-ts";
import { PartialProps } from "./utils/componentUtils";

type Props = {
  a: {
    aName: string;
    aInfo: {
      aInfoName: string;
      aInfoAge: number;
    };
  };
  b: Array<{ bName: string; bAge: number }>;
};

const C = (props: Props) => {
  console.log(props);
  return <div>dd</div>;
};

const d = {
  a: {
    aName: "default aName",
    aInfo: {
      aInfoName: "default aInfoName",
      aInfoAge: -1,
    },
  },
  b: [
    { bName: "default bName1", bAge: -1 },
    { bName: "default bName2", bAge: -1 },
  ],
};
C(d); /*?*/

const dd = PartialProps(C);

const ddd = dd({});

type ExclusiveOptions = MergeExclusive<
  Props,
  {
    a: {
      aInfo: {
        aInfoName: string;
      };
    };
  }
>;

const dda: ExclusiveOptions = {
  a: {
    aName: "default aName",
    aInfo: {
      aInfoName: "default aInfoName",
      aInfoAge: -1,
    },
  },
  b: [
    { bName: "default bName1", bAge: -1 },
    { bName: "default bName2", bAge: -1 },
  ],
};

type T = MergeDeep<
  Props,
  {
    c: { name: string };
    a: {
      aInfo: {
        items: string[];
      };
    };
  }
>;
