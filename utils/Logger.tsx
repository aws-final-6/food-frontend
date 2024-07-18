export function errLog(apiId: string, errorLog: any) {
  const logMessage = {
    type: "ERROR",
    apiId: apiId,
    errorLog: errorLog,
  };

  console.error("Frontend: ", JSON.stringify(logMessage));
}

export function successLog(
  apiId: string,
  statusCode: number,
  statusMessage: string,
  additionalInfo = {}
) {
  const logType = statusCode >= 200 && statusCode < 300 ? "SUCCESS" : "ERROR";

  const logMessage = {
    type: logType,
    apiId: apiId,
    statusCode: statusCode,
    statusMessage: statusMessage,
    ...additionalInfo,
  };

  console.log("Frontend: ", JSON.stringify(logMessage));
}

export function infoLog(
  apiId: string,
  reqBody?: {},
  callPosition?: string,
  additionalInfo = {}
) {
  const logMessage = {
    type: "INFO",
    apiId: apiId,
    reqBody: reqBody,
    callPosition: callPosition,
    ...additionalInfo,
  };

  console.log("Frontend: ", JSON.stringify(logMessage));
}
