import * as fs from "node:fs";
import { resolve } from "node:path";

import { parse } from "@swc/core";
import type { CustomAtRules, TransformOptions } from "lightningcss";
import { transform } from "lightningcss";
import type { Plugin } from "vite";
import { normalizePath } from "vite";

const isTsCss = /\.css.ts$/;
const root = process.cwd();

function normalizePaths(root2, path) {
  return (Array.isArray(path) ? path : [path])
    .map((path2) => resolve(root2, path2))
    .map(normalizePath);
}
export interface Options<C extends CustomAtRules> {
  /**
   * Input directory
   *
   * @default 'src/assets/images/svg/*.svg'
   */
  outputFile?: string;
  transformOptions?: Omit<TransformOptions<C>, "filename" | "code">;
}

export const vitePluginTsLightningCss = <C extends CustomAtRules>({
  outputFile = "app",
  transformOptions,
}: Options<C>): Plugin[] => {
  const cssContents = [];
  let config;

  return [
    {
      name: "ts-lignthning-css:serve",
      configResolved(_config) {
        config = _config;
      },

      transform(src, id) {
        if (isTsCss.test(id)) {
          console.log("vite-plugin-ts–lightningcss.ts:86", id);
        }
      },
    },
    {
      name: "ts-lightning-css:build",

      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: `${outputFile}.css`,
          source: cssContents.join("\n"),
        });
      },

      async transform(src, id) {
        console.log(id);
        if (isTsCss.test(id)) {
          const { code, map } = transform({
            filename: id,
            code: Buffer.from(src),
            minify: isBuild,
            sourceMap: !isBuild,
            ...transformOptions,
          });

          console.log("vite-plugin-ts–lightningcss.ts:51", code);

          // const ast = await parse(code.toString(), { syntax: 'typescript', target: 'es2022' })
          //
          // console.log('vite-plugin-ts–lightningcss.ts:52', src, id)
          // ast.body.forEach((node) => {
          //   JSON.stringify(node)
          // })

          // document.body.append(JSON.stringify(ast))
          // document.body.append('hihi')
          // if (isBuild) {
          //   ast.body.forEach((node) => {
          //     console.log('vite-plugin-ts–lightningcss.ts:56', node)
          //   })
          // } else {
          //   // 스타일시트를 HTML 헤더에 추가하는 코드를 생성합니다.
          //   const injectCode = `
          //   const style = document.createElement('style').setAttribute('data-file', '${id}');
          //   style.innerText = \`${code}\`;
          //   document.head.appendChild(style);
          // `
          //   return {
          //     code: injectCode,
          //     map: map ? map.toString() : undefined,
          //   }
          // }
        }
      },
    },
  ];
};
