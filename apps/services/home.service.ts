import { IResponseBody } from "@common/interfaces/response-util.interface";
import { ResponseBody } from "@common/utils/response.util";
import { Injectable } from "@nestjs/common";

@Injectable()
export class HomeService {
	getData(): IResponseBody {
		return new ResponseBody({
			statusCode: 200,
			message: "Information",
			data: {
				project: process.env?.npm_package_name,
				description: process.env?.npm_package_description,
				version: `v${process.env?.npm_package_version}`,
				creator: process.env?.npm_package_author_name,
				license: process.env?.npm_config_init_license,
				isPrivate: process.env?.npm_package_private,
				registry: process.env?.npm_config_registry,
				hostType: process.env?.HOSTTYPE,
				author: {
					name: process.env?.npm_package_author_name,
					email: process.env?.npm_package_author_email,
					url: process.env?.npm_package_author_url,
				},
				env: process.env,
			},
		});
	}
}
