// Ported from js-yaml v3.13.1:
// https://github.com/nodeca/js-yaml/commit/665aadda42349dcae869f12040d9b10ef18d12da
// Copyright 2011-2015 by Vitaly Puzrin. All rights reserved. MIT license.
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { Type } from "../type.js";
import type { Any } from "../_utils.js";

const { hasOwn } = Object;
const _toString = Object.prototype.toString;

function resolveYamlOmap(data: Any): boolean {
  const objectKeys: string[] = [];
  let pairKey = "";
  let pairHasKey = false;

  for (const pair of data) {
    pairHasKey = false;

    if (_toString.call(pair) !== "[object Object]") return false;

    for (pairKey in pair) {
      if (hasOwn(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data: Any): Any {
  return data !== null ? data : [];
}

export const omap = new Type("tag:yaml.org,2002:omap", {
  construct: constructYamlOmap,
  kind: "sequence",
  resolve: resolveYamlOmap,
});
