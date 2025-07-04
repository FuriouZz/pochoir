import "../_dnt.polyfills.js";
export default function () {
    return (env) => {
        env.tags.push(functionTag);
    };
}
function functionTag(env, code, _output, tokens) {
    if (!code.match(/^(export\s+)?(async\s+)?function\s/)) {
        return;
    }
    const match = code.match(/^(export\s+)?(async\s+)?function\s+(\w+)\s*(\([^)]+\))?$/);
    if (!match) {
        throw new Error(`Invalid function: ${code}`);
    }
    const [_, exp, as, name, args] = match;
    const compiled = [];
    compiled.push(`${as || ""} function ${name} ${args || "()"} {`);
    compiled.push(`let __output = "";`);
    const result = env.compileFilters(tokens, "__output");
    if (exp) {
        compiled.push(...env.compileTokens(tokens, "__output", ["/export"]));
        if (tokens.length && (tokens[0][0] !== "tag" || tokens[0][1] !== "/export")) {
            throw new Error(`Missing closing tag for export function tag: ${code}`);
        }
    }
    else {
        compiled.push(...env.compileTokens(tokens, "__output", ["/function"]));
        if (tokens.length && (tokens[0][0] !== "tag" || tokens[0][1] !== "/function")) {
            throw new Error(`Missing closing tag for function tag: ${code}`);
        }
    }
    tokens.shift();
    compiled.push(`return ${result};`);
    compiled.push(`}`);
    if (exp) {
        compiled.push(`__exports["${name}"] = ${name}`);
    }
    return compiled.join("\n");
}
