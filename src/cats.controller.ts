import { Controller, Get, Req, Post, HttpCode, Header, Redirect, Query, Param, Body, Put, Delete } from '@nestjs/common'
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './create-cat.dto';
import { UpdateCatDto } from './update-cat.dto';

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Req() request: Request): string {
        return "This action returns all cats"
    }

    @Get('breed')
    findBreed(): string {
        return "Breed"
    }

    @Post()
    @HttpCode(204)
    create(): string {
        return "This action adds a new cat";
    }

    @Get('ab*cd')
    fincAll(): string {
        return "This route uses a wildcard"
    }

    @Post('cache')
    @Header('Cache-Control', 'none')
    createCache() {
        return "This action addes a new cat with cache" 
    }

    @Get('redirect')
    @Redirect('https://nestjs.com', 301)
    redirectAction() {
        return ''
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302)
    getDocs(@Query('version') version) {
        if (version && version === '5') {
            return { url: 'https://docs.nestjs.com/v5/'};
        }
    }

    @Get('find/:id')
    findOne(@Param() params: any): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get('query')
    findItem(@Query('test') query: any) {
        console.log(query)
        return `This action returns a value: ${query}`
    }

    @Get('asyncPromise')
    async asyncPromisefindAll(): Promise<any[]> {
        return [];
    } 

    @Get('async')
    asyncFindAll(): Observable<any[]> {
        return of([{
            "test": "Hello"
        }]);
    }

    @Post('createCat')
    async createCat(@Body() createCatDto: CreateCatDto) {
        if (createCatDto !== null) {
            console.log(`body: ${createCatDto.age}`)
            return {
                result: "completed"
            }
        }

        return "This action creates a new cat";
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}

