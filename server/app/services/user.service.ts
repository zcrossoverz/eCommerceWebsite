import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/user.entity";
import { BadRequestError, ErrorInterface } from "../utils/error";
import bcryptjs from "bcryptjs";

enum UserRole {
  ADMIN = "admin",
  MEMBER = "member",
}

interface UserInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
}

interface UserReturnInterface extends UserInterface {
  role: UserRole;
  createAt: Date;
  isActive: boolean;
  id: number;
}

const userRepository = AppDataSource.getRepository(User);

export const createUser = async ({
  email,
  password,
  firstName,
  lastName,
  address,
  phone,
}: UserInterface): Promise<ErrorInterface | UserReturnInterface> => {

  if(!email) return BadRequestError("email cannot empty!");
  if(!password) return BadRequestError("password cannot empty!");
  
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
    address,
    phone
  });
  return await userRepository.save(newUser);
};

export const getOneUser = async (
  id: number
): Promise<ErrorInterface | UserReturnInterface> => {
  const result = await userRepository.findOneBy({ id });
  return result ? result : BadRequestError("user not found!");
};

export const updateOneUser = async (
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

  if(password){
    user.password = bcryptjs.hashSync(password, 8);
  }

  console.log(user);
  
  // return BadRequestError("test")
  return await userRepository.update({ id }, user);
};

export const deleteOneUser = async (id: number): Promise<ErrorInterface | DeleteResult> => {
  const findUser = await userRepository.findOneBy({ id });
  if (!findUser) return BadRequestError("user not found!");

  return await userRepository.delete({ id });
};

export const getAllUser = async (): Promise<Array<UserReturnInterface>> => {
  return await userRepository.find();
}

export const findOneUser = async (
  email: string
): Promise<ErrorInterface | UserReturnInterface> => {
  const result = await userRepository.findOneBy({ email });
  return result ? result : BadRequestError("user not found!");
};