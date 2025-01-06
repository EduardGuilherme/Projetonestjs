import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number
    @Column({length: 100})
    nome: string
    @Column({length: 255})
    senha:string
    @Column({unique:true})
    @IsEmail()
    email:string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    UpdatedAt: Date

    @OneToMany(() => Recado, recado => recado.de)
    recadosEnviados: Recado[];
    // Uma pessoa pode ter recebido muitos recados (como "para")
    // Esses recados são relacionados ao campo "para" na entidade recado
    @OneToMany(() => Recado, recado => recado.para)
    recadosRecebidos: Recado[];
}
