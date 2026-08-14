export default function validateVkn(value) {
    const digitsOnlyRegex = /^[0-9]+$/;
    if (typeof value !== "string") {
        return {
            valid: false,
            code: "INVALID_TYPE",
            expected_type: "string",
            text: "Beklenen vkn verisi alınan vkn verisi ile uyuşmadı."
        };
    }
    const vkn = value.trim();
    if (!vkn) {
        return {
            valid: false,
            code: "EMPTY_VALUE",
            text: "Alınan veri boş olamaz."
        };
    }
    if (!digitsOnlyRegex.test(vkn)) {
        return {
            valid: false,
            code: "INVALID_CHARACTERS",
            text: "Alınan vkn verisinin içeriği sadece rakam içermelidir."
        };
    }
    if (vkn.length !== 10) {
        return {
            valid: false,
            code: "INVALID_LENGTH",
            text: "Alınan vkn verisi 10 haneli olmak zorundadır."
        };
    }
    const digits = vkn.split("").map(Number);
    const weightedSum = digits.slice(0, 9).reduce((sum, digit, index) => {
        const position = index + 1;
        const shiftedDigit = (digit + (10 - position)) % 10;
        const weightedDigit = shiftedDigit === 9
            ? 9
            : (shiftedDigit * (2 ** (10 - position))) % 9;
        return sum + weightedDigit;
    }, 0);
    const checkDigit = (10 - (weightedSum % 10)) % 10;
    if (digits[9] !== checkDigit) {
        return {
            valid: false,
            code: "INVALID_CHECK_DIGIT",
            text: "10. hane doğrulaması başarısız."
        };
    }
    return {
        valid: true,
        code: "VALID",
        text: "Vkn doğrulandı."
    };
}
//# sourceMappingURL=validateVkn.js.map