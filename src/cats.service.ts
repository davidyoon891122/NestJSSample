import { Injectable } from "@nestjs/common";
import { Cat } from "./cats.interface";

// Service will be responsible for data storage and retrieval, and is designed to be used by the CatsController
@Injectable()
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }
}