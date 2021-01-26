import { Response } from "express";
import camelcaseKeys from "camelcase-keys";
import RESPONSE_CODES from "./common-response-codes";

const successResponse = (message: string, data: any, res: Response) => {
  const camelCaseeData = camelcaseKeys(data, { deep: true }).map((d) => d.doc);
  res.status(RESPONSE_CODES.SUCCESS).json(camelCaseeData);
};

const failureResponse = (message: string, data: any, res: Response) => {
  res.status(RESPONSE_CODES.BAD_REQUEST).json({
    message: message,
    data,
  });
};

const notFoundResponse = (res: Response) => {
  return res.status(RESPONSE_CODES.NOT_FOUND).json({
    message: "No players matched your query",
  });
};

const insufficientParameters = (res: Response) => {
  res.status(RESPONSE_CODES.BAD_REQUEST).json({
    message: "Insufficient parameters",
    data: {},
  });
};

const dbError = (err: any, res: Response) => {
  res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
    message: "MongoDB error",
    data: err,
  });
};

export {
  successResponse,
  failureResponse,
  insufficientParameters,
  dbError,
  notFoundResponse,
};
