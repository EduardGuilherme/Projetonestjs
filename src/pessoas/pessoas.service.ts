import { ConflictException ,Injectable,NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ){}
  
  notFoundException() {
    throw new NotFoundException('Recado não encontrado!');
  }

  async create(createPessoaDto: CreatePessoaDto) {
    try {
      const dadosPessoa = {
        nome: createPessoaDto.nome,
        senha: createPessoaDto.senha,
        email: createPessoaDto.email,
      };
    
      const novaPessoa = this.pessoaRepository.create(dadosPessoa);
      await this.pessoaRepository.save(novaPessoa);
      return novaPessoa;
   } catch (error) {
      
      if (error.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
      throw error;
    }
  }

  findAll() {
    const pessoas = this.pessoaRepository.find()
    return pessoas
  }

  async findOne(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: {
        id,
      },
    });

      return pessoa;
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaUpdate = {
      nome:updatePessoaDto?.nome,
      senha:updatePessoaDto.senha,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...pessoaUpdate,
    });
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    return this.pessoaRepository.save(pessoa);
  }

  async remove(id: number) {
    const pessoaindex = await this.pessoaRepository.findOneBy({
      id,
    })
    if(pessoaindex === null)
      return this.notFoundException()

    return this.pessoaRepository.remove(pessoaindex)
  }
}
