import { describe, expect, test } from "vitest";
import validateVKN from "../src/validateVkn";

describe("validateVKN", () => {
    test("string olmayan değerleri reddetmeli", () => {
        const result = validateVKN(24742901 as any);

        expect(result).toEqual({
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        });
    });

    test("boş string'i reddetmeli", () => {
        expect(validateVKN("")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("sadece boşluklardan oluşan değeri reddetmeli", () => {
        expect(validateVKN("   ")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("harf içeren değeri reddetmeli", () => {
        expect(validateVKN("10000000A1")).toEqual({
            valid: false,
            code: "INVALID_CHARACTERS",
        });
    });

    test("özel karakter içeren değeri reddetmeli", () => {
        expect(validateVKN("10000000-01")).toEqual({
            valid: false,
            code: "INVALID_CHARACTERS",
        });
    });

    test("10 haneden kısa değeri reddetmeli", () => {
        expect(validateVKN("123456789")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });
    });

    test("10 haneden uzun değeri reddetmeli", () => {
        expect(validateVKN("12345678901")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });
    });

    test("geçersiz checksum'a sahip VKN'yi reddetmeli", () => {
        expect(validateVKN("1000000001")).toEqual({
            valid: false,
            code: "INVALID_CHECKSUM",
        });
    });

    test("başındaki ve sonundaki boşlukları görmezden gelmeli", () => {
        expect(validateVKN("  1000000000  ")).toEqual({
            valid: true,
        });
    });

        test("geçerli bir VKN'yi kabul etmeli", () => {
        expect(validateVKN("1000000000")).toEqual({
            valid: true,
        });
    });
});