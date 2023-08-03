import { Controller } from '@nestjs/common';
import { DatabaseService } from './database.service';

export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}
}
