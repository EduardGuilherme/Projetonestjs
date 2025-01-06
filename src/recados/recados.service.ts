import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService
  ) {}
  
  notFoundException() {
    throw new NotFoundException('Recado não encontrado!');
  }
  async findAll() {
    const recado = await this.recadoRepository.find(
      {
        relations: ['de', 'para'],
        order: {
          id: 'desc',
        },
        select: {
          de: {
            id: true,
            nome: true,
          },
          para: {
            id: true,
            nome: true,
          },
        },
      }
    );
    return recado;
    //return this.recados;
  }

  async findOne(id: number) {
    //const recado = this.recados.find(item => item.id === id);
    const recado = await this.recadoRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });

    if (!recado) return this.notFoundException();

    return recado;
  }

  async create(createRecadoDto: CreateRecadoDto) {
    const { texto,deId, paraId } = createRecadoDto;
    // Encontrar a pessoa que está criando o recado
    const de = await this.pessoasService.findOne(deId);
    // Encontrar a pessoa para quem o recado está sendo enviado
    const para = await this.pessoasService.findOne(paraId);

    console.log({ texto,de, para });

    const novoRecado = {
      texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const recado = await this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return {
      ...recado,
      de: {
        id: recado.de.id,
      },
      para: {
        id: recado.para.id,
      },
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });
    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;
  
    return await this.recadoRepository.save(recado);
  }

  async remove(id: number) {
    const recadoExistenteIndex = await this.recadoRepository.findOneBy({
      id,
    });
    if (recadoExistenteIndex === null) {
      return this.notFoundException();
    }

    return this.recadoRepository.remove(recadoExistenteIndex);
  }
}
