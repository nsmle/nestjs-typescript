import { Global, Module } from "@nestjs/common";
import { DatabaseProvider } from "@core/database.provider";

@Global()
@Module({
  providers: [...DatabaseProvider],
  exports: [...DatabaseProvider],
})
export class DatabaseModule {}
