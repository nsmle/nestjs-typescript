import { IResponseBody, Response, IResponseBodyOptional } from "@common/interfaces/response-util.interface";
import { NextFunction } from "express";

export class ResponseBody implements IResponseBody {
	statusCode: number;
	message: string;
	data?: any;
	error?: any;
	type?: "success" | "error";

	constructor(responseBody: IResponseBodyOptional) {
		if (!responseBody.statusCode || !responseBody.message) {
			this.statusCode = 200;
			this.message = "Ok";
			responseBody = { data: responseBody };
		} else {
			this.statusCode = responseBody.statusCode;
			this.message = responseBody.message;
		}

		if (responseBody.data) {
			if (!responseBody?.statusCode) responseBody.statusCode = 200;
			if (!responseBody?.message) responseBody.message = "Ok";
			this.type = "success";
			this.data = responseBody.data;
		} else if (responseBody.error) {
			if (!responseBody?.statusCode) responseBody.statusCode = 500;
			if (!responseBody?.message) responseBody.message = "Unknown Error";
			this.type = "error";
			this.error = responseBody.error;
		}
	}

	public static serialize(responseBody: ResponseBody): ResponseBody {
		return {
			statusCode: responseBody.statusCode,
			message: responseBody.message,
			...(responseBody?.data && {
				data: responseBody?.data,
			}),
			...(responseBody?.error && {
				error: responseBody?.error,
			}),
		};
	}
}

export const ResponseUtil = (request: Request, response: Response, next?: NextFunction): void => {
	response.success = (responseBody: IResponseBody | ResponseBody): Response => {
		if (responseBody instanceof ResponseBody) responseBody = ResponseBody.serialize(responseBody);
		if (!responseBody?.statusCode || !responseBody?.message)
			responseBody = {
				statusCode: 200,
				message: "Ok",
				data: responseBody,
			};

		return response.status(responseBody.statusCode).json(responseBody);
	};

	response.error = (responseBody: IResponseBody | ResponseBody): Response => {
		if (responseBody instanceof ResponseBody) responseBody = ResponseBody.serialize(responseBody);
		if (!responseBody?.statusCode || !responseBody?.message)
			responseBody = {
				statusCode: 500,
				message: "Unknown Error",
				error: responseBody,
			};

		return response.status(responseBody.statusCode).json(responseBody);
	};

	response.sending = (responseBody: IResponseBodyOptional | ResponseBody): Response => {
		if (responseBody instanceof ResponseBody) responseBody = ResponseBody.serialize(responseBody);
		return response.status(responseBody.statusCode).json(responseBody);
	};

	next();
};
