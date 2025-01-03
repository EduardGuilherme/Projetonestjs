import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {

  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>, 
  ) {}
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];
  notFoundException() {
    throw new NotFoundException("Recado não encontrado!")
  }
  async findAll() {

    const recado = await this.recadoRepository.find();
    return recado;
    //return this.recados;
  }

  async findOne(id: number) {
    //const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where:{
        id,
      },
    });

    if (!recado)
      return this.notFoundException();

    return recado;
  }

  create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);

    return this.recadoRepository.save(recado);
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) return this.notFoundException();

    await this.recadoRepository.save(recado);
  }

 async remove(id: number) {
    const recadoExistenteIndex = await this.recadoRepository.findOneBy({
      id,
    });
    if (recadoExistenteIndex === null) {
      return this.notFoundException();
    }
      
    return this.recadoRepository.remove(recadoExistenteIndex)
  }
}