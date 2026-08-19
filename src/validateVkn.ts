import { ValidationResult } from "./types.js";

export default function validateVkn(value: string): ValidationResult {
    const digitsOnlyRegex = /^[0-9]+$/;

    if (typeof value !== "string") {
        return {
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        }
    }

    const vkn = value.trim();

    if (!vkn) {
        return {
            valid: false,
            code: "EMPTY_VALUE",
        }
    }

    if (!digitsOnlyRegex.test(vkn)) {
        return {
            valid: false,
            code: "INVALID_CHARACTERS",
        }
    }

    if (vkn.length !== 10) {
        return {
            valid: false,
            code: "INVALID_LENGTH",
        }
    }

    const digits = vkn.split("").map(Number);

    const weightedSum = digits.slice(0, 9).reduce((sum, digit, index) => {
        const position = index + 1;
        const shiftedDigit = (digit + (10 - position)) % 10;
        const weightedDigit =
            shiftedDigit === 9
                ? 9
                : (shiftedDigit * (2 ** (10 - position))) % 9;

        return sum + weightedDigit;
    }, 0);

    const checkDigit = (10 - (weightedSum % 10)) % 10;

    if (digits[9] !== checkDigit) {
        return {
            valid: false,
            code: "INVALID_CHECKSUM",
        }
    }

    return {
        valid: true,
        code: "VALID",
    }
}