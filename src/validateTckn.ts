type TCKNErrorCode =
    | "INVALID_TYPE"
    | "EMPTY_VALUE"
    | "INVALID_CHARACTERS"
    | "INVALID_LENGTH"
    | "INVALID_FIRST_DIGIT"
    | "INVALID_CHECKSUM_10"
    | "INVALID_CHECKSUM_11";

type ValidationResult =
    | {
        valid: true;
    }
    | {
        valid: false;
        code: TCKNErrorCode;
        expected_type?: "string"
    };

export default function validateTCKN(value: string): ValidationResult {
    const digitsOnlyRegex = /^[0-9]+$/;

    if (typeof value !== "string") {
        return {
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        }   
    }
    const tckn = value.trim();

    if (!tckn) {
        return {
            valid: false,
            code: "EMPTY_VALUE",
        }
    }

    if (!digitsOnlyRegex.test(tckn)) {
        return {
            valid: false,
            code: "INVALID_CHARACTERS",
        }
    }

    if (tckn.length !== 11) {
        return {
            valid: false,
            code: "INVALID_LENGTH",
        }
    }

    if (tckn[0] === "0") {
        return {
            valid: false,
            code: "INVALID_FIRST_DIGIT",
        }
    }

    const characters = tckn.split("");
    const digits = characters.map(Number);

    const rawTenth =
        (((digits[0] + digits[2] + digits[4] + digits[6] + digits[8]) * 7) -
            (digits[1] + digits[3] + digits[5] + digits[7])) % 10;

    const expectedTenthDigit = ((rawTenth % 10) + 10) % 10;

    const expectedEleventhDigit =
        digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

    if (expectedTenthDigit !== digits[9]) {
        return {
            valid: false,
            code: "INVALID_CHECKSUM_10",
        }
    }

    if (expectedEleventhDigit !== digits[10]) {
        return {
            valid: false,
            code: "INVALID_CHECKSUM_11",
        }
    }

    return {
        valid: true
    }
}