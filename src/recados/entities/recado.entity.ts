import { Pessoa } from 'src/pessoas/entities/pessoa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;
 /* @Column({ type: 'varchar', length: 255 })
  de: string;
  @Column({ type: 'varchar', length: 255 })
  para: string;*/
  @Column({ default: false })
  lido: boolean;
  @Column()
  data: Date;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Pessoa)
  // Especifica a coluna "de" que armazena o ID da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Pessoa;
  // Muitos recados podem ser enviados para uma única pessoa (destinatário)
  @ManyToOne(() => Pessoa)
  // Especifica a coluna "para" que armazena o ID da pessoa que recebe o recado
  @JoinColumn({ name: 'para' })
  para: Pessoa;
}
