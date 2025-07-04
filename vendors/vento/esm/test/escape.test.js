import "../_dnt.test_polyfills.js";
import * as dntShim from "../_dnt.test_shims.js";
import { test, testSync } from "./utils.js";
dntShim.Deno.test("Escape filter", async () => {
    await test({
        template: `
    {{ "<h1>Hello world</h1>" |> escape }}
    `,
        expected: "&lt;h1&gt;Hello world&lt;/h1&gt;",
    });
    testSync({
        template: `
    {{ "<h1>Hello world</h1>" |> escape }}
    `,
        expected: "&lt;h1&gt;Hello world&lt;/h1&gt;",
    });
});
dntShim.Deno.test("Escape by default", async () => {
    await test({
        options: {
            autoescape: true,
        },
        template: `
    {{ "<h1>Hello world</h1>" }}
    `,
        expected: "&lt;h1&gt;Hello world&lt;/h1&gt;",
    });
    testSync({
        options: {
            autoescape: true,
        },
        template: `
    {{ "<h1>Hello world</h1>" }}
    `,
        expected: "&lt;h1&gt;Hello world&lt;/h1&gt;",
    });
});
dntShim.Deno.test("Escape non-string", async () => {
    await test({
        template: `
    {{ 100 |> escape }}
    `,
        expected: "100",
    });
    testSync({
        template: `
    {{ 100 |> escape }}
    `,
        expected: "100",
    });
});
dntShim.Deno.test("Escape undefined", async () => {
    await test({
        template: `
    {{ undefined |> escape }}
    `,
        expected: "",
    });
    testSync({
        template: `
    {{ undefined |> escape }}
    `,
        expected: "",
    });
});
