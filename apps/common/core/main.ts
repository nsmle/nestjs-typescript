import { NestFactory } from "@nestjs/core";
import { MainModule } from "@core/main.module";
import { ConfigService } from "@nestjs/config";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import { ResponseUtil } from "@common/utils/response.util";

const listen = async (app: INestApplication, config: ConfigService): Promise<any> => {
	const env = process.env.NODE_ENV ?? config.get<string>("app.env");
	const port = Number(process.env.PORT) || config.get<number>("app.port");
	const log = (host: string): void =>
		Logger.log(
			`Server Runing on ${host.replace(
				"http://[::1]",
				`http://${config.get<string>("app.host").replace(/http\:\/\/|https\:\/\//gim, "")}`,
			)}`,
			"Server",
		);

	const localEnv = ["dev", "development", "local", "staging"];
	if (localEnv.includes(env)) {
		return await app.listen(port, async (): Promise<void> => log(await app.getUrl()));
	}

	return await app.listen(
		port,
		config.get<string>("app.host", "0.0.0.0"),
		async (): Promise<void> => log(await app.getUrl()),
	);
};

const bootstrap = async (): Promise<any> => {
	const app = await NestFactory.create(MainModule);
	const config = app.get(ConfigService);

	app.use(ResponseUtil);
	app.enableCors(config.get("cors"));
	app.useGlobalPipes(new ValidationPipe());
	return listen(app, config);
};

bootstrap();
