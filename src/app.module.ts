import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AppController } from './app.controller';

import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { AutomobilesModule } from './automobiles/automobiles.module';

import User from './users/user.entity';
import { Automobile } from './automobiles/automobile.entity';
import { Company } from './companies/company.entity';
import { AuthenticationModule } from './authentication/authentication.module';

const entities = [User, Automobile, Company];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: entities,
      synchronize: true,
    }),
    UsersModule,
    AuthenticationModule,
    CompaniesModule,
    AutomobilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
