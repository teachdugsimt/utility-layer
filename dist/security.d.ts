export default class Security {
    private salt;
    characters: string;
    alphabet: string;
    encryptByKms(source: string, masterKeyId: string): Promise<string | undefined>;
    decryptByKms(source: string): Promise<string | undefined>;
    generateUniqueId(length?: number): string;
    generateRefCode(length?: number): string;
    generateOtpCode(length?: number): string;
    generateOtpSecretCode(source: string): string;
    generatePassword(length?: number): string;
    encodeUserId(id: number): string;
    decodeUserId(cipherText: string): any;
    getUserIdByToken(token: string): any;
    generateJwtToken(data: any): string;
    matchEncryptId(str: string): number | null;
}
