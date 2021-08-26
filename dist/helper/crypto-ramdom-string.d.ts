interface DataEntity {
    length?: number;
    type?: undefined | 'hex' | 'base64' | 'url-safe' | 'numeric' | 'distinguishable' | 'ascii-printable' | 'alphanumeric';
    characters?: string;
}
declare const cryptoRandomString: (data?: DataEntity | undefined) => string;
export default cryptoRandomString;
