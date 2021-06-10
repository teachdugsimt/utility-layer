export default class BuildResponse {
    buildErrorMessage(status: number, name: string, headers: any, userMessage: string, developerMessage: string, detail: any): {
        isBase64Encoded: boolean;
        statusCode: number;
        headers: any;
        body: string;
    };
}
