import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { User } from '@modules/users/infra/typeorm/entities/User';

@Entity('addresses')
export class Address {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  address: string;

  @Column('int')
  number: number;

  @Column()
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
