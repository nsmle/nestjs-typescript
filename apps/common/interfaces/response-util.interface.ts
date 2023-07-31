import { ResponseBody } from "@common/utils/response.util";
import { Response as BaseResponse, Request as BaseRequest } from "express";

export type IResponseMessage = string;

export interface IResponseBody {
	statusCode: number;
	message: string;
	data?: any;
	error?: any;
}

export interface IResponseBodyOptional {
	statusCode?: number;
	message?: string;
	data?: any;
	error?: any;
}

export type ResponseType = BaseResponse<IResponseBody, Record<string, any>>;
export type ResponseTypePromise = Promise<ResponseType>;

export interface Response extends BaseResponse {
	success: (responseBody: ResponseBody | IResponseBody) => ResponseType;
	error: (responseBody: ResponseBody | IResponseBody) => ResponseType;
	sending: (responseBody: ResponseBody | IResponseBody) => ResponseType;
}
