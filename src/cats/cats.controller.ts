import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Param, Body, Put, Delete, HttpStatus, Res } from '@nestjs/common'
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Post()
    async create(@Res() res: Response, @Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
        res.status(HttpStatus.OK).json([createCatDto])
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }
}