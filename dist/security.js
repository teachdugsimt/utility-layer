"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_ramdom_string_1 = __importDefault(require("./crypto-ramdom-string"));
const crypto_1 = __importDefault(require("crypto"));
const hashids_1 = __importDefault(require("hashids"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const kms = new aws_sdk_1.default.KMS();
class Security {
    constructor() {
        this.salt = 'secretkeyforcargolinkproject';
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    }
    // [MOVE] to utillity layer
    async encryptByKms(source, masterKeyId) {
        const params = {
            KeyId: masterKeyId,
            Plaintext: source,
        };
        const { CiphertextBlob } = await kms.encrypt(params).promise();
        return CiphertextBlob === null || CiphertextBlob === void 0 ? void 0 : CiphertextBlob.toString('hex');
    }
    // [MOVE] to utillity layer
    async decryptByKms(source) {
        const params = {
            CiphertextBlob: Buffer.from(source, 'hex'),
        };
        const { Plaintext } = await kms.decrypt(params).promise();
        return Plaintext === null || Plaintext === void 0 ? void 0 : Plaintext.toString();
    }
    // [MOVE] to utillity layer
    generateUniqueId(length = 6) {
        return crypto_ramdom_string_1.default({ length: length, characters: this.characters });
    }
    // [MOVE] to utillity layer
    generateRefCode(length = 6) {
        return crypto_ramdom_string_1.default({ length: length, type: 'alphanumeric' });
    }
    // [MOVE] to utillity layer
    generateOtpCode(length = 4) {
        return crypto_ramdom_string_1.default({ length: length, type: 'numeric' });
    }
    // [MOVE] to utillity layer
    generateOtpSecretCode(source) {
        return crypto_1.default.createHmac('sha256', source).digest('hex');
    }
    // [MOVE] to utillity layer
    generatePassword(length = 10) {
        return crypto_ramdom_string_1.default({ length: length, type: 'base64' });
    }
    // [MOVE] to utillity layer
    encodeUserId(id) {
        const hashids = new hashids_1.default(this.salt, 8, this.alphabet);
        return hashids.encode(id);
    }
    // [MOVE] to utillity layer
    decodeUserId(cipherText) {
        const hashids = new hashids_1.default(this.salt, 8, this.alphabet);
        return hashids.decode(cipherText)[0];
    }
    // [MOVE] to utillity layer
    getUserIdByToken(token) {
        const data = jsonwebtoken_1.default.decode(token);
        return data['userId'];
    }
    generateJwtToken(data) {
        return jsonwebtoken_1.default.sign(data, this.salt);
    }
}
exports.default = Security;
// const main = async () => {
//   const repo = new Security()
//   const res = repo.generateJwtToken({ user_id: 'testuser' })
//   console.log("result : ", res)
// }
// main()
//# sourceMappingURL=security.js.map