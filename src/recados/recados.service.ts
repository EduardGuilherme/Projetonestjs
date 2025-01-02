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
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);

    return novoRecado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === id,
    );
    if (recadoExistenteIndex < 0) {
      return this.notFoundException();
    }

    const recadoExistente = this.recados[recadoExistenteIndex];

    this.recados[recadoExistenteIndex] = {
      ...recadoExistente,
      ...updateRecadoDto,
    }
    return this.recados[recadoExistenteIndex];
  }

  remove(id: number) {
    const recadoExistenteIndex = this.recados.findIndex(
      item => item.id === id,
    );
    if (recadoExistenteIndex < 0) {
      return this.notFoundException();
    }
    const recado = this.recados[recadoExistenteIndex];
    
    this.recados.splice(recadoExistenteIndex, 1);
    
   
    return recado;
  }
}