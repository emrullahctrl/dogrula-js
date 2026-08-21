import { describe, expect, test } from "vitest";
import validateTCKN from "../src/validateTckn";

describe("validateTCKN", () => {

    test("string olmayan değerleri reddetmeli", () => {
        const result = validateTCKN(12345678901 as any);

        expect(result).toEqual({
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
        });
    });

    test("boş string'i reddetmeli", () => {
        expect(validateTCKN("")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("sadece boşluklardan oluşan değeri reddetmeli", () => {
        expect(validateTCKN("   ")).toEqual({
            valid: false,
            code: "EMPTY_VALUE",
        });
    });

    test("harf içeren değeri reddetmeli", () => {
        expect(validateTCKN("10000000A46")).toEqual({
            valid: false,
            code: "INVALID_CHARACTERS",
        });
    });

    test("özel karakter içeren değeri reddetmeli", () => {
        expect(validateTCKN("100000001-6")).toEqual({
            valid: false,
            code: "INVALID_CHARACTERS",
        });
    });

    test("11 haneden kısa değeri reddetmeli", () => {
        expect(validateTCKN("1000000014")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });
    });

    test("11 haneden uzun değeri reddetmeli", () => {
        expect(validateTCKN("100000001460")).toEqual({
            valid: false,
            code: "INVALID_LENGTH",
        });
    });

    test("ilk hanesi 0 olan TCKN'yi reddetmeli", () => {
        expect(validateTCKN("02849374605")).toEqual({
            valid: false,
            code: "INVALID_FIRST_DIGIT",
        });
    });

    test("10. checksum hanesi hatalıysa reddetmeli", () => {
        expect(validateTCKN("84102914468")).toEqual({
            valid: false,
            code: "INVALID_CHECKSUM_10",
        });
    });

    test("11. checksum hanesi hatalıysa reddetmeli", () => {
        expect(validateTCKN("84102914457")).toEqual({
            valid: false,
            code: "INVALID_CHECKSUM_11",
        });
    });

    test("başındaki ve sonundaki boşlukları kabul etmeli", () => {
        expect(validateTCKN(" 10000000146 ")).toEqual({
            valid: true,
        });
    });

        test("geçerli TCKN'yi kabul etmeli", () => {
        expect(validateTCKN("10000000146")).toEqual({
            valid: true,
        });
    });
});