import { APP_FILTER } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthorizationMiddleware } from './app.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './emails/email.module';
import { AllExceptionsFilter } from './app.filters.exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('emails');
  }
}
