import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';

// @Module decorator provides metadata that Nest makes use of to organize the application structure
@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(LoggerMiddleware)
    .exclude(
      { path: 'cats', method: RequestMethod.GET }
    )
    .forRoutes(CatsController);
  }
}
