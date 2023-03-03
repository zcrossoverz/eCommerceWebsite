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

export const getAll = async (): Promise<Array<UserReturnInterface>> => {
  return await userRepository.find();
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

export const updateAddress = async (id: number, addr: string) => {
  const address = addressRepository.findOneBy({id});
  if(!address) return BadRequestError("address not found");
  if(!addr) return BadRequestError("address empty");
  return await addressRepository.update({id}, { address: addr })
}