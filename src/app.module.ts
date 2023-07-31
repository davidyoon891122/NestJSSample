import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats/cats.controller';
import { AppService } from './app.service';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

// @Module decorator provides metadata that Nest makes use of to organize the application structure
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
