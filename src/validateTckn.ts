import { ValidationResult } from "./types.js";

export default function validateTCKN(value: string): ValidationResult {
    const digitsOnlyRegex = /^[0-9]+$/;

    if (typeof value !== "string") {
        return {
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
            text: "Beklenen tckn verisi alınan tckn verisi ile uyuşmadı."
        }
    }
    const tckn = value.trim();

    if (!tckn) {
        return {
            valid: false,
            code: "EMPTY_VALUE",
            text: "Alınan veri boş olamaz."
        }
    }

    if (!digitsOnlyRegex.test(tckn)) {
        return {
            valid: false,
            code: "INVALID_CHARACTERS",
            text: "Alınan tckn verisinin içeriği sadece rakam içermelidir."
        }
    }

    if (tckn.length !== 11) {
        return {
            valid: false,
            code: "INVALID_LENGTH",
            text: "Alınan tckn verisi 11 haneli olmak zorundadır."
        }
    }

    if (tckn[0] === "0") {
        return {
            valid: false,
            code: "INVALID_FIRST_DIGIT",
            text: "Alınan tckn verisinin 1. hanesi 0 olamaz."
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
            code: "INVALID_CHECK_DIGIT",
            text: "10. hane doğrulaması başarısız."
        }
    }

    if (expectedEleventhDigit !== digits[10]) {
        return {
            valid: false,
            code: "INVALID_CHECK_DIGIT",
            text: "11. hane doğrulaması başarısız."
        }
    }

    return {
        valid: true,
        code: "VALID",
        text: "Tckn kontrolü başarılı."
    }
}