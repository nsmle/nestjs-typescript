import { Module } from "@nestjs/common";
import { DynamicModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "@core/database.module";
import { HomeController } from "@controller/home.controller";
import { HomeService } from "@service/home.service";
import appConfig from "@config/app.config";
import corsConfig from "@config/cors.config";
import databaseConfig from "@config/database.config";
import jwtConfig from "@config/jwt.config";

const CoreModule: DynamicModule[] = [
  ConfigModule.forRoot({
    envFilePath: [
      ".env",
      ".env.local",
      ".env.development",
      ".env.staging",
      ".env.production",
    ],
    load: [appConfig, corsConfig, databaseConfig, jwtConfig],
    cache: true,
    isGlobal: true,
  }),
];

@Module({
  imports: [...CoreModule /**, DatabaseModule */],
  controllers: [HomeController],
  providers: [HomeService],
})
export class MainModule {}
