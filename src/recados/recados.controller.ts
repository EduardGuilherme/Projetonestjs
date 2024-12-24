import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';



@Controller('recados')
export class RecadosController {
    constructor(private readonly recadosService: RecadosService) {}
  
@Get()
  findAll() {
    //return 'retorna todos';
    return this.recadosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findOne(id);
  }
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto){
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id:string){
    this.recadosService.remove(id);
  }
}
