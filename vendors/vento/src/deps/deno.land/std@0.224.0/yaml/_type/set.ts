// Ported from js-yaml v3.13.1:
// https://github.com/nodeca/js-yaml/commit/665aadda42349dcae869f12040d9b10ef18d12da
// Copyright 2011-2015 by Vitaly Puzrin. All rights reserved. MIT license.
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.

import { Type } from "../type.js";
import type { Any } from "../_utils.js";

const { hasOwn } = Object;

function resolveYamlSet(data: Any): boolean {
  if (data === null) return true;

  for (const key in data) {
    if (hasOwn(data, key)) {
      if (data[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data: string): Any {
  return data !== null ? data : {};
}

export const set = new Type("tag:yaml.org,2002:set", {
  construct: constructYamlSet,
  kind: "mapping",
  resolve: resolveYamlSet,
});
