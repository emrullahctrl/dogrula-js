type IBANErrorCode =
    | "INVALID_TYPE"
    | "EMPTY_VALUE"
    | "INVALID_LENGTH"
    | "INVALID_COUNTRY"
    | "INVALID_FORMAT"
    | "INVALID_CHARACTERS"
    | "INVALID_CHECKSUM";
type ValidationResult =
    | {
        valid: true
    }
    | {
        valid: false,
        code: IBANErrorCode,
        expected_type?: "string"
    }
export default function validateIBAN(value: string): ValidationResult {
    const digitsOnlyRegex = /^[0-9]+$/;

    if (typeof value !== "string") {
        return {
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        }
    }

    const iban = value
        .replace(/[\s-]/g, "")
        .toUpperCase();

    if (!iban) {
        return {
            valid: false,
            code: "EMPTY_VALUE",
        }
    }

    if (iban.length !== 26) {
        return {
            valid: false,
            code: "INVALID_LENGTH",
        }
    }

    if (!iban.startsWith("TR")) {
        return {
            valid: false,
            code: "INVALID_COUNTRY"
        }
    }

    if (iban[9] !== "0") {
        return {
            valid: false,
            code: "INVALID_FORMAT"
        };
    }

    const rest = iban.slice(2);

    if (!digitsOnlyRegex.test(rest)) {
        return {
            valid: false,
            code: "INVALID_CHARACTERS",
        }
    }

    const checkDigits = iban.slice(2, 4);
    const accountPart = iban.slice(4);
    const rearranged = BigInt(accountPart + "2927" + checkDigits);

    if (rearranged % 97n !== 1n) {
        return {
            valid: false,
            code: "INVALID_CHECKSUM"
        }
    }


    return {
        valid: true,
    }
}
