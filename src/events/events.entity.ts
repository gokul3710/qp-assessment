import { Events } from 'src/common/constants/events';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: Events;

  @Column()
  metadata: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;
}