import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Cat } from "./cats.interface";
import { response } from "express";

// Service will be responsible for data storage and retrieval, and is designed to be used by the CatsController
@Injectable() // Injectable decorator attaches metadata, which declares that CatsService is a class that can be managed by the Nest IoC container.
export class CatsService {
    private readonly cats: Cat[] = [];

    create(cat: Cat): string {
        this.cats.push(cat);
        return "Success";
    }

    findAll(): Cat[] {
        return this.cats;
    }

    async findAllExcept(): Promise<string> {
        throw new HttpException("message", HttpStatus.FORBIDDEN);
    }
}