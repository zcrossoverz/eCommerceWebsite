import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/user.entity";
import { BadRequestError, ErrorInterface } from "../utils/error";
import bcryptjs from "bcryptjs";
import { Address } from "../entities/address.entity";

enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface UserReturnInterface extends UserInterface {
  role: UserRole;
  createAt: Date;
  isActive: boolean;
  id: number;
}

export const userRepository = AppDataSource.getRepository(User);
const addressRepository = AppDataSource.getRepository(Address);


export const create = async ({
  email,
  password,
  firstName,
  lastName,
  phone,
}: UserInterface): Promise<ErrorInterface | UserReturnInterface> => {
  if (!email) return BadRequestError("email cannot empty!");
  if (!password) return BadRequestError("password cannot empty!");

  const emailExists = await userRepository.findOneBy({ email: email });
  if (emailExists) return BadRequestError("email already exists!");

  if (phone) {
    const phoneExists = await userRepository.findOneBy({ phone: phone });
    if (phoneExists) return BadRequestError("phone number already exists!");
  }

  const passwordHash = bcryptjs.hashSync(password, 8);

  const newUser = userRepository.create({
    email,
    password: passwordHash,
    firstName,
    lastName,
    phone,
  });
  return await userRepository.save(newUser);
};

export const getOne = async (
  id: number
): Promise<ErrorInterface | UserReturnInterface> => {
  const result = await userRepository.findOne({
    where: {
      id
    },
    relations: {
      address: true
    }
  });
  return result ? result : BadRequestError("user not found!");
};

export const updateOne = async (
  id: number,
  user: UserInterface
): Promise<ErrorInterface | UpdateResult> => {
  const findUser = await userRepository.findOneBy({ id });
  if (!findUser) return BadRequestError("user not found!");

  const { email, phone, password } = user;
  if (email) {
    const emailExists = await userRepository.findOneBy({ email });
    if (emailExists) return BadRequestError("email already exists!");
  }

  if (phone) {
    const phoneExists = await userRepository.findOneBy({ phone });
    if (phoneExists) return BadRequestError("phone number already exists!");
  }

  if (password) {
    user.password = bcryptjs.hashSync(password, 8);
  }

  return await userRepository.update({ id }, user);
};

export const deleteOne = async (
  id: number
): Promise<ErrorInterface | DeleteResult> => {
  const findUser = await userRepository.findOneBy({ id });
  if (!findUser) return BadRequestError("user not found!");

  return await userRepository.delete({ id });
};

export const getAll = async (limit: number, page: number) => {
  const offset = (page-1)*limit;
  const [result, count] = await userRepository.findAndCount({
    take: limit,
    skip: offset
  });
  const last_page = Math.ceil(count/limit);
  const prev_page = page - 1 < 1 ? null : page - 1;
  const next_page = page + 1 > last_page ? null : page + 1;
  return result.length ? {
    current_page: page,
    prev_page, next_page, last_page,
    data_per_page: limit,
    total: count,
    data: result
  } : BadRequestError("user not found!");
};

export const findOneByEmail = async (
  email: string
): Promise<ErrorInterface | UserReturnInterface> => {
  const result = await userRepository.findOneBy({ email });
  return result ? result : BadRequestError("user not found!");
};

export const addAddress = async (id: number, addr: string) => {
  const user = await userRepository.findOne({
    where: {
      id
    },
    relations: {
      address: true
    }
  });
  if(!addr) return BadRequestError("address empty");
  if(!user) return BadRequestError("user not found!");
  const new_addr = addressRepository.create({
    address: addr,
    user: user
  });
  const rs = await addressRepository.save(new_addr);
  const { default_address } = user;
  if(!default_address) await userRepository.update({id}, { default_address:rs.id });
  const { id: id_addr, address } = rs;
  return {
    id: id_addr, address
  };
};

export const setDefaultAddress = async (id_user: number, id_addr: number) => {
  const user = await userRepository.findOne({
    where: {
      id: id_user
    },
    relations: {
      address: true
    }
  });
  if(!user) return BadRequestError("user not found!");
  if(user.address.find(({ id }) => id === id_addr)) {
    await userRepository.update({ id: id_user }, { default_address: id_addr });
    return { msg: "success" };
  }
  return BadRequestError("id address not found");
};

export const updateAddress = async (id_user: number, id_addr: number, addr: string) => {
  const address = await addressRepository.findOne({
    where: {
      id: id_addr
    },
    relations: {
      user: true
    }
  });
  if(!address) return BadRequestError("address not found");
  if(address.user.id !== id_user) return BadRequestError("you dont have this address id");
  if(!addr) return BadRequestError("address empty");
  return await addressRepository.update({id: id_addr}, { address: addr })
};

export const deleteAddress = async (id_user:number, id_addr: number) => {
  const address = await addressRepository.findOneBy({id: id_addr});
  const user = await userRepository.findOne({
    where: { 
      id: id_user
    },
    relations: {
      address: true
    }
  });
  if(!address) return BadRequestError("address not found");
  if(!user) return BadRequestError("user not found");
  let deleted = false;
  let index = 0;
  for(const {id} of user.address) {
    if(id === id_addr) {
      if(user.default_address === id){
        user.address.splice(index, 1);
        if(user.address.length) await userRepository.update({ id: id_user }, { default_address: user.address.at(0)?.id });
        else await userRepository.update({ id: id_user }, { default_address: 0 })
      }
      await addressRepository.delete({id});
      deleted = true;
    }
    index++;
  }
  if(deleted) return { msg: "success" };
  else return BadRequestError("you dont have this address id");
}