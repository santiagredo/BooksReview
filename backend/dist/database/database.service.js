"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const config_1 = require("@nestjs/config");
let DatabaseService = exports.DatabaseService = class DatabaseService {
    constructor(configService) {
        this.configService = configService;
        this.DATABASE_USERNAME = this.configService.get('DATABASE_USERNAME');
        this.DATABASE_PASSWORD = this.configService.get('DATABASE_PASSWORD');
        this.DATABASE_CLUSTER_NAME = this.configService.get('DATABASE_CLUSTER_NAME');
        this.DATABASE_NAME = this.configService.get('DATABASE_NAME');
        this.uri = `mongodb+srv://${encodeURIComponent(this.DATABASE_USERNAME)}:${encodeURIComponent(this.DATABASE_PASSWORD)}@${encodeURIComponent(this.DATABASE_CLUSTER_NAME)}/?retryWrites=true&w=majority`;
        this.client = new mongodb_1.MongoClient(this.uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        this.database = this.client.db(this.DATABASE_NAME);
    }
};
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map