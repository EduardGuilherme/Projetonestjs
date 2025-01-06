import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosController } from 'src/recados/recados.controller';
import { RecadosModule } from 'src/recados/recados.module';
import { RecadosService } from 'src/recados/recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      port: 5432,
      database: 'dbnest',
      password: '123',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
