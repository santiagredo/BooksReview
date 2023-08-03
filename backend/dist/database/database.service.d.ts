import { ConfigService } from '@nestjs/config';
export declare class DatabaseService {
    private configService;
    constructor(configService: ConfigService);
    private DATABASE_USERNAME;
    private DATABASE_PASSWORD;
    private DATABASE_CLUSTER_NAME;
    private DATABASE_NAME;
    private uri;
    private client;
    database: import("mongodb").Db;
}
