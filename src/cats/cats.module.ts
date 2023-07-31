import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService] // any module that imports the CatsModule has access to the CatsService and will share the same instance
})

export class CatsModule {
    constructor(private catsService: CatsService) {}
}