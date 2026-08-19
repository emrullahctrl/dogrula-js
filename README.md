# dogrula-js

[![npm version](https://img.shields.io/npm/v/dogrula-js.svg)](https://www.npmjs.com/package/dogrula-js)
[![license](https://img.shields.io/npm/l/dogrula-js.svg)](LICENSE)

Türkiye'ye özgü verileri doğrulamak için geliştirilmiş, TypeScript destekli JavaScript kütüphanesi.

## Özellikler

- T.C. Kimlik Numarası (TCKN) doğrulama
- Vergi Kimlik Numarası (VKN) doğrulama
- Türkiye IBAN doğrulama
- TypeScript desteği
- Detaylı doğrulama sonuçları

## Kurulum

```bash
npm install dogrula-js
```

## T.C. Kimlik Numarası
```ts
import { validateTCKN } from "dogrula-js";

const result = validateTCKN("12345678901");

console.log(result);
```

## Vergi Kimlik Numarası
```ts
import { validateVKN } from "dogrula-js";

const result = validateVKN("1234567890");

console.log(result);
```

## IBAN
```ts
import { validateIBAN } from "dogrula-js";

const result = validateIBAN("TR00 0000 0000 0000 0000 0000 00");

console.log(result);
```

## Sonuç
Doğrulama fonksiyonları aşağıdaki yapıda bir sonuç döndürür:
```ts
{
    valid: true,
    code: "VALID"
}
```
Geçersiz bir değer için:
```ts
{
    valid: false,
    code: "INVALID_LENGTH"
}
```

### Hata Kodları

* INVALID_TYPE
* EMPTY_VALUE
* INVALID_CHARACTERS
* INVALID_LENGTH
* INVALID_FIRST_DIGIT
* INVALID_CHECKSUM

## Desteklenen Doğrulamalar
| Doğrulama | Fonksiyon |
|-----------|-----------|
| TCKN      | `validateTCKN()` |
| VKN       | `validateVKN()` |
| IBAN      | `validateIBAN()` |

## TypeScript
Kütüphane TypeScript ile geliştirilmiştir ve tip tanımlarıyla birlikte gelir.

## Lisans
MIT
