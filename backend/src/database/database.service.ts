import { Injectable } from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
    constructor(private configService: ConfigService) {}

    private DATABASE_USERNAME =
        this.configService.get<string>('DATABASE_USERNAME');
    private DATABASE_PASSWORD =
        this.configService.get<string>('DATABASE_PASSWORD');
    private DATABASE_CLUSTER_NAME = this.configService.get<string>(
        'DATABASE_CLUSTER_NAME',
    );

    private DATABASE_NAME = this.configService.get<string>('DATABASE_NAME');

    private uri = `mongodb+srv://${encodeURIComponent(
        this.DATABASE_USERNAME,
    )}:${encodeURIComponent(this.DATABASE_PASSWORD)}@${encodeURIComponent(
        this.DATABASE_CLUSTER_NAME,
    )}/?retryWrites=true&w=majority`;

    private client = new MongoClient(this.uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    database = this.client.db(this.DATABASE_NAME);

    // private async connectDatabase() {
    //     await this.client.connect();
    //     console.log('Connected successfully to the database');
    // }

    // private async disconnectDatabase() {
    //     this.client.close();
    //     console.log('Database connection finalized');
    // }
}
