export interface ICreateAddressDTO {
  user_id: string;
  address: string;
  number?: number;
  complement?: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  country: string;
}
