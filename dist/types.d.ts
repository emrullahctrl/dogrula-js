interface ValidationSuccess {
    valid: true;
    text: string;
    code: string;
}
interface ValidationError {
    valid: false;
    text: string;
    code: string;
    expected_type?: "string" | "number";
}
export type ValidationResult = ValidationSuccess | ValidationError;
export {};
//# sourceMappingURL=types.d.ts.map