interface ValidationSuccess {
    valid: true;
    code: string;
}

interface ValidationError {
    valid: false;
    code: string;
    expected_type?: "string" | "number";
}

export type ValidationResult = ValidationSuccess | ValidationError;

