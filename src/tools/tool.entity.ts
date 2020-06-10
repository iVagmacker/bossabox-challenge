import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  tags: string;
  
  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  createdAt: Date;
}