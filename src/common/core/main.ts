import { NestFactory } from "@nestjs/core";
import { MainModule } from "@core/main.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const config = app.get(ConfigService);

  app.enableCors(config.get("cors"));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get("app.port"));
}
bootstrap();
