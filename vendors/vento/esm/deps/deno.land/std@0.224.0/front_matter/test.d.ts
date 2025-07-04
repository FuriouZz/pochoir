export type Format = "yaml" | "toml" | "json" | "unknown";
/**
 * Tests if a string has valid front matter. Supports YAML, TOML and JSON.
 *
 * @param str String to test.
 * @param formats A list of formats to test for. Defaults to all supported formats.
 *
 * ```ts
 * import { test } from "https://deno.land/std@$STD_VERSION/front_matter/test.ts";
 *
 * test("---\ntitle: Three dashes marks the spot\n---\n"); // true
 * test("---toml\ntitle = 'Three dashes followed by format marks the spot'\n---\n"); // true
 * test("---json\n{\"title\": \"Three dashes followed by format marks the spot\"}\n---\n"); // true
 * test("---json\n{\"title\": \"Three dashes followed by format marks the spot\"}\n---\n", ["yaml"]); // false
 * ```
 */
export declare function test(str: string, formats?: Format[]): boolean;
//# sourceMappingURL=test.d.ts.map