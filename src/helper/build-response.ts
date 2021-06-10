import momenttimezone from 'moment-timezone';

const EN = 'EN';
const TH = 'TH';
const DATETIMEFORMAT = 'YYYY-MM-DD HH:mm:ss'

const validateLanguage = (headers: any) => {
  return headers && new RegExp(/th/, 'i').test(headers['x-api-language']) ? TH : EN;
};

export default class BuildResponse {

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

  buildErrorMessage(status: number, name: string, headers: any, userMessage: string, developerMessage: string, detail: any) {
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
          dateTime: momenttimezone(new Date())
            // .tz(process.env.TIMEZONE)
            .format(DATETIMEFORMAT),
        }
      }),
    };

    return objresponse;
  }

}
