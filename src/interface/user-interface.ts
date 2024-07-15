interface IAddress {
  city: string;
  street: string;
  zipcode: string;
}

export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  phone?: string;
  address?: IAddress;
}
