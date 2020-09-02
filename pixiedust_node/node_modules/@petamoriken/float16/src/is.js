import { ToInteger } from "./spec";

export { default as isArrayBuffer } from "lodash-es/isArrayBuffer";

/**
 * @param {unknown} view
 * @returns {boolean}
 */
export function isDataView(view) {
    return view instanceof DataView;
}

/**
 * @param {unknown} key
 * @returns {boolean}
 */
export function isStringNumberKey(key) {
    return typeof key === "string" && key === ToInteger(key) + "";
}
