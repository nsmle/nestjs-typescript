import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";

export const DatabaseProvider = [
  {
    provide: "SEQUELIZE",
    inject: [ConfigService],
    useFactory: async (config: ConfigService): Promise<Sequelize> => {
      // prettier-ignore
      const sequelize = new Sequelize(config.get("database.uri") ?? {
        dialect: config.get("database.driver"),
        host: config.get("database.host"),
        port: config.get("database.port"),
        username: config.get("database.username"),
        password: config.get("database.password"),
        database: config.get("database.name"),
      });

      // Set sequelize options
      sequelize.options.timezone = config.get("database.timezone");

      // Import entities/models here. E.g: [UserModel,CategoryModel]
      sequelize.addModels([]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
