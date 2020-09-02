import { convertToNumber, roundToFloat16Bits } from "./lib";

/**
 * returns the nearest half precision float representation of a number.
 * @param {number} num
 * @returns {number}
 */
export default function hfround(num) {
    num = Number(num);

    // for optimization
    if (!Number.isFinite(num) || num === 0) {
        return num;
    }

    const x16 = roundToFloat16Bits(num);
    return convertToNumber(x16);
}
