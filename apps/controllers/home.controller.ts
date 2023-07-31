import { Response, ResponseType } from "@common/interfaces/response-util.interface";
import { ResponseBody } from "@common/utils/response.util";
import { Controller, Get, Param, Res } from "@nestjs/common";
import { HomeService } from "@service/home.service";

@Controller()
export class HomeController {
	constructor(private readonly homeService: HomeService) {}

	@Get("/")
	getHello(@Res() response: Response): ResponseType {
		return response.success(this.homeService.getData());
	}

	@Get("/info")
	info2(@Res() response: Response): ResponseType {
		const responseBody = new ResponseBody(this.homeService.getData());
		return response.success(responseBody);
	}

	@Get("/info/opt")
	infoOpt(@Res() response: Response): ResponseType {
		const data = this.homeService.getData().data;

		const responseBody = new ResponseBody(data);
		return response.sending(responseBody);
	}

	@Get("/info/opt/:status")
	infoOpt2(@Res() response: Response, @Param("status") status: string): ResponseType {
		const data = this.homeService.getData().data;

		if (status == "success") return response.success(data);
		if (status == "error") return response.error(data);

		return response.sending(data);
	}
}
