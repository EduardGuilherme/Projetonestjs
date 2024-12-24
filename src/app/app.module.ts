import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosController } from 'src/recados/recados.controller';
import { RecadosModule } from 'src/recados/recados.module';
import { RecadosService } from 'src/recados/recados.service';

@Module({
  imports: [RecadosModule],
  controllers: [AppController, RecadosController],
  providers: [AppService,RecadosService],
})
export class AppModule {}
