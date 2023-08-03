import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseController } from './database.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [],
    providers: [DatabaseService, ConfigService],
})
export class DatabaseModule {}
