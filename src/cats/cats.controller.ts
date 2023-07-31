import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Param, Body, Put, Delete, HttpStatus, Res, HttpException, UseFilters, ParseIntPipe, UsePipes } from '@nestjs/common'
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat, createCatSchema } from './cats.interface';
import { ForbiddenException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { JoiValidationPipe } from 'src/validation.pipe';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    // @Post()
    // async create(@Res() res: Response, @Body() createCatDto: CreateCatDto) {
    //     this.catsService.create(createCatDto);
    //     res.status(HttpStatus.OK).json([createCatDto])
    // }

    @Post()
    @UsePipes(new JoiValidationPipe(createCatSchema))
    async create(@Body() createCatDto: CreateCatDto) {
        return this.catsService.create(createCatDto)
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get('except')
    async findAllExcept() {
        try {
            await this.catsService.findAllExcept()
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'This is a custom message'
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Get('exceptCustom')
    async findAllExceptCustom() {
        throw new ForbiddenException
    }

    @Post('create')
    @UseFilters(new HttpExceptionFilter())
    async createCat(@Body() createCatDto: CreateCatDto) {
        throw new ForbiddenException();
    }

    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //     return this.catsService.findOne(id)
    // }

    @Get(':id')
    async findOne(
      @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
      id: number,
    ) {
      return this.catsService.findOne(id);
    }
}