import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Listing extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 200})
    title: string

    @Column({length: 250})
    imgUrl: string
}