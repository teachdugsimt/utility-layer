"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_random_string_1 = __importDefault(require("crypto-random-string"));
const crypto = __importStar(require("crypto"));
const hashids_1 = __importDefault(require("hashids"));
const jwt = __importStar(require("jsonwebtoken"));
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
        return crypto_random_string_1.default({ length: length, characters: this.characters });
    }
    // [MOVE] to utillity layer
    generateRefCode(length = 6) {
        return crypto_random_string_1.default({ length: length, type: 'alphanumeric' });
    }
    // [MOVE] to utillity layer
    generateOtpCode(length = 4) {
        return crypto_random_string_1.default({ length: length, type: 'numeric' });
    }
    // [MOVE] to utillity layer
    generateOtpSecretCode(source) {
        return crypto.createHmac('sha256', source).digest('hex');
    }
    // [MOVE] to utillity layer
    generatePassword(length = 10) {
        return crypto_random_string_1.default({ length: length, type: 'base64' });
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
        const data = jwt.decode(token);
        return data['userId'];
    }
    generateJwtToken(data) {
        return jwt.sign(data, this.salt);
    }
}
exports.default = Security;
//# sourceMappingURL=security.js.map