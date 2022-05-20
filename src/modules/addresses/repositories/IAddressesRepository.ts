import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';
import { Address } from '../infra/typeorm/entities/Address';

export interface IAddressesRepository {
  listAll(): Promise<Address[]>;
  create(data: ICreateAddressDTO): Promise<Address>;
  remove(address: Address): Promise<void>;
  save(address: Address): Promise<void>;
  findById(id: string): Promise<Address>;
}
