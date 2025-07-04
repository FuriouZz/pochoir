import "../_dnt.test_polyfills.js";
import * as dntShim from "../_dnt.test_shims.js";
import { test, testSync } from "./utils.js";

dntShim.Deno.test("Unescape filter", async () => {
  await test({
    template: `
    {{ "&lt;h1&gt;Hello world&lt;/h1&gt;" |> unescape }}
    `,
    expected: "<h1>Hello world</h1>",
  });
  testSync({
    template: `
    {{ "&lt;h1&gt;Hello world&lt;/h1&gt;" |> unescape }}
    `,
    expected: "<h1>Hello world</h1>",
  });
});

dntShim.Deno.test("Unescape with escape by default", async () => {
  await test({
    options: {
      autoescape: true,
    },
    template: `
    {{ "<h1>Hello world</h1>" |> unescape |> safe }}
    `,
    expected: "<h1>Hello world</h1>",
  });
  testSync({
    options: {
      autoescape: true,
    },
    template: `
    {{ "<h1>Hello world</h1>" |> unescape |> safe }}
    `,
    expected: "<h1>Hello world</h1>",
  });
});

dntShim.Deno.test("Unescape non-string", async () => {
  await test({
    template: `
    {{ 100 |> unescape }}
    `,
    expected: "100",
  });
  testSync({
    template: `
    {{ 100 |> unescape }}
    `,
    expected: "100",
  });
});

dntShim.Deno.test("Unescape undefined", async () => {
  await test({
    template: `
    {{ undefined |> unescape }}
    `,
    expected: "",
  });
  testSync({
    template: `
    {{ undefined |> unescape }}
    `,
    expected: "",
  });
});
