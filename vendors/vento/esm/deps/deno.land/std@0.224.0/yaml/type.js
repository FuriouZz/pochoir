// Ported from js-yaml v3.13.1:
// https://github.com/nodeca/js-yaml/commit/665aadda42349dcae869f12040d9b10ef18d12da
// Copyright 2011-2015 by Vitaly Puzrin. All rights reserved. MIT license.
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.
function checkTagFormat(tag) {
    return tag;
}
export class Type {
    tag;
    kind = null;
    instanceOf;
    predicate;
    represent;
    defaultStyle;
    styleAliases;
    loadKind;
    constructor(tag, options) {
        this.tag = checkTagFormat(tag);
        if (options) {
            this.kind = options.kind;
            this.resolve = options.resolve || (() => true);
            this.construct = options.construct || ((data) => data);
            this.instanceOf = options.instanceOf;
            this.predicate = options.predicate;
            this.represent = options.represent;
            this.defaultStyle = options.defaultStyle;
            this.styleAliases = options.styleAliases;
        }
    }
    resolve = () => true;
    construct = (data) => data;
}
