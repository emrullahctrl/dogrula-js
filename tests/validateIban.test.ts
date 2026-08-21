import { describe, expect, test } from "vitest";
import validateIBAN from "../src/validateIban"; 

describe("validateIBAN", () => {
    test("string olmayan değerleri reddetmeli", () => {
        const result = validateIBAN(1700010000000000000001 as any);

        expect(result).toEqual({
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        });
    });

    test("boş string'i reddetmeli", () => {
        expect(validateIBAN("")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("sadece boşluk veya tire içeren değerleri reddetmeli", () => {
        expect(validateIBAN("  -  ")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("26 haneden kısa veya uzun değerleri reddetmeli", () => {
        expect(validateIBAN("TR170001000000000000000")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });

        expect(validateIBAN("TR17000100000000000000000001")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });
    });

    test("TR ile başlamayan IBAN'ları reddetmeli", () => {
        expect(validateIBAN("DE170001000000000000000001")).toEqual({
            valid: false,
            code: "INVALID_COUNTRY",
        });
    });

    test("rezerv alanı '0' olmayan IBAN'ları reddetmeli", () => {
        expect(validateIBAN("TR170001010000000000000001")).toEqual({
            valid: false,
            code: "INVALID_FORMAT",
        });
    });

    test("TR dışında harf içeren değerleri reddetmeli", () => {
        expect(validateIBAN("TR170001000000000000000A01")).toEqual({
            valid: false,
            code: "INVALID_CHARACTERS",
        });
    });

    test("geçersiz checksum'a sahip IBAN'ı reddetmeli", () => {
        expect(validateIBAN("TR180001000000000000000001")).toEqual({
            valid: false,
            code: "INVALID_CHECKSUM",
        });
    });

    test("boşluklu ve tireli biçimlendirilmiş geçerli IBAN'ı kabul etmeli", () => {
        expect(validateIBAN("TR88 0000 1000 0000 0000 0000 00")).toEqual({
            valid: true,
        });

        expect(validateIBAN("TR88-0000-1000-0000-0000-0000-00")).toEqual({
            valid: true,
        });
    });

    test("küçük harfle girilmiş geçerli IBAN'ı kabul etmeli", () => {
        expect(validateIBAN("tr880000100000000000000000")).toEqual({
            valid: true,
        });
    });

    test("geçerli bir IBAN'ı kabul etmeli", () => {
        expect(validateIBAN("TR880000100000000000000000")).toEqual({
            valid: true,
        });
    });
});