"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const EN = 'EN';
const TH = 'TH';
const DATETIMEFORMAT = 'YYYY-MM-DD HH:mm:ss';
const validateLanguage = (headers) => {
    return headers && new RegExp(/th/, 'i').test(headers['x-api-language']) ? TH : EN;
};
class BuildResponse {
    /*
    build(status, headers, responsecode, userMessage, developerMessage, responseobject) {
      let errorCodeResponse = {};
      console.log('Buildresponse.Build Header :', headers);
      const language = validateLanguage(headers);
  
      errorCodeResponse.error_code = responsecode;
      errorCodeResponse.business_message = userMessage;
      errorCodeResponse.developer_message = developerMessage;
  
      let objresponse = {
        isBase64Encoded: false,
        statusCode: status,
        headers: headers,
        body: JSON.stringify({
          responseCode: errorCodeResponse.error_code,
          userMessage: errorCodeResponse.business_message,
          developerMessage: errorCodeResponse.developer_message,
          responseDateTime: momenttimezone(new Date())
            .tz(process.env.TIMEZONE)
            .format(process.env.DATETIMEFORMAT),
          responseData: responseobject,
        }),
      };
      console.log('Response Service : ', process.env.RESOURCE_ID, process.env.ACTION, objresponse);
      objresponse = await _validateHTTPStatusCode(objresponse);
      return objresponse;
    }
    */
    // ```{
    //   "error": {
    //     "statusCode": "string",
    //     "name": "string",
    //     "language": "<lang>",
    //     "message": {
    //       "user": "some error",
    //       "developer": "string"
    //     },
    //     "detail": [{}, {}]
    //   }
    // }```
    buildErrorMessage(status, name, headers, userMessage, developerMessage, detail) {
        const language = validateLanguage(headers);
        let objresponse = {
            isBase64Encoded: false,
            statusCode: status,
            headers: headers,
            body: JSON.stringify({
                error: {
                    statusCode: status,
                    name: name,
                    language: language,
                    message: {
                        user: userMessage,
                        developer: developerMessage
                    },
                    detail: detail,
                    dateTime: moment_timezone_1.default(new Date())
                        // .tz(process.env.TIMEZONE)
                        .format(DATETIMEFORMAT),
                }
            }),
        };
        return objresponse;
    }
}
exports.default = BuildResponse;
//# sourceMappingURL=build-response.js.map