// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

import type { GlobOptions } from "../_common/glob_to_reg_exp.js";
import { join } from "./join.js";
import { SEPARATOR } from "./constants.js";
import { normalizeGlob } from "./normalize_glob.js";

export type { GlobOptions };

/**
 * Like join(), but doesn't collapse "**\/.." when `globstar` is true.
 *
 * @example Usage
 *
 * ```ts
 * import { joinGlobs } from "@std/path/windows/join-globs";
 * import { assertEquals } from "@std/assert";
 *
 * const joined = joinGlobs(["foo", "**", "bar"], { globstar: true });
 * assertEquals(joined, "foo\\**\\bar");
 * ```
 *
 * @param globs The globs to join.
 * @param options The options for glob pattern.
 * @returns The joined glob pattern.
 */
export function joinGlobs(
  globs: string[],
  options: Pick<GlobOptions, "globstar"> = {},
): string {
  const { globstar = false } = options;
  if (!globstar || globs.length === 0) {
    return join(...globs);
  }
  let joined: string | undefined;
  for (const glob of globs) {
    const path = glob;
    if (path.length > 0) {
      if (!joined) joined = path;
      else joined += `${SEPARATOR}${path}`;
    }
  }
  if (!joined) return ".";
  return normalizeGlob(joined, { globstar });
}
