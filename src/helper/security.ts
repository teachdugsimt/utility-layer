import cryptoRandomString from 'crypto-random-string';
import crypto from 'crypto';
import Hashids from 'hashids';
import jwt from 'jsonwebtoken';

import AWS from 'aws-sdk'
const kms = new AWS.KMS()

export default class Security {

  private salt: string = 'secretkeyforcargolinkproject'

  public characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  public alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

  // [MOVE] to utillity layer
  async encryptByKms(source: string, masterKeyId: string): Promise<string | undefined> {
    const params = {
      KeyId: masterKeyId,
      Plaintext: source,
    };
    const { CiphertextBlob } = await kms.encrypt(params).promise();
    return CiphertextBlob?.toString('hex');
  }

  // [MOVE] to utillity layer
  async decryptByKms(source: string): Promise<string | undefined> {
    const params = {
      CiphertextBlob: Buffer.from(source, 'hex'),
    };
    const { Plaintext } = await kms.decrypt(params).promise();
    return Plaintext?.toString();
  }

  // [MOVE] to utillity layer
  generateUniqueId(length: number = 6): string {
    return cryptoRandomString({ length: length, characters: this.characters })
  }

  // [MOVE] to utillity layer
  generateRefCode(length: number = 6): string {
    return cryptoRandomString({ length: length, type: 'alphanumeric' })
  }

  // [MOVE] to utillity layer
  generateOtpCode(length: number = 4): string {
    return cryptoRandomString({ length: length, type: 'numeric' })
  }

  // [MOVE] to utillity layer
  generateOtpSecretCode(source: string): string {
    return crypto.createHmac('sha256', source).digest('hex');
  }

  // [MOVE] to utillity layer
  generatePassword(length: number = 10): string {
    return cryptoRandomString({ length: length, type: 'base64' });
  }

  // [MOVE] to utillity layer
  encodeUserId(id: number): string {
    const hashids = new Hashids(this.salt, 8, this.alphabet);
    return hashids.encode(id);
  }

  // [MOVE] to utillity layer
  decodeUserId(cipherText: string): any {
    const hashids = new Hashids(this.salt, 8, this.alphabet);
    return hashids.decode(cipherText)[0]
  }

  // [MOVE] to utillity layer
  getUserIdByToken(token: string): any {
    const data: any = jwt.decode(token);
    return data['userId']
  }

  generateJwtToken(data: any): string {
    return jwt.sign(data, this.salt);
  }
}
