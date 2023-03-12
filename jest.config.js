/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    moduleFileExtensions: ["js", "json", "ts"],
    moduleNameMapper: {
      "^@common/(.*)": ["<rootDir>/../src/common/$1"],
      "^@core/(.*)": ["<rootDir>/../src/core/$1"],
      "^@decorator/(.*)": ["<rootDir>/../src/common/decorators/$1"],
      "^@guard/(.*)": ["<rootDir>/../src/common/guards/$1"],
      "^@helper/(.*)": ["<rootDir>/../src/common/helpers/$1"],
      "^@interface/(.*)": ["<rootDir>/../src/common/interfaces/$1"],
      "^@strategy/(.*)": ["<rootDir>/../src/common/strategis/$1"],
      "^@util/(.*)": ["<rootDir>/../src/common/utils/$1"],
      "^@config/(.*)": ["<rootDir>/../src/configs/$1"],
      "^@controller/(.*)": ["<rootDir>/../src/controllers/$1"],
      "^@dto/(.*)": ["<rootDir>/../src/dtos/$1"],
      "^@entity/(.*)": ["<rootDir>/../src/entities/$1"],
      "^@module/(.*)": ["<rootDir>/../src/modules/$1"],
      "^@provider/(.*)": ["<rootDir>/../src/providers/$1"],
      "^@repository/(.*)": ["<rootDir>/../src/repositories/$1"],
      "^@service/(.*)": ["<rootDir>/../src/services/$1"],
    },
    rootDir: "test",
    testRegex: ".*\\.spec\\.ts$",
    transform: {
      "^.+\\.(t|j)s$": "ts-jest",
    },
    collectCoverageFrom: ["**/*.(t|j)s"],
    coverageDirectory: "../coverage",
    testEnvironment: "node",
  };
};
