import { AppDataSource } from "../database";
import { User } from "../entities/user.entity";

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
}

const userRepository = AppDataSource.getRepository(User);

export const createUser = async ({
    email,
    password,
    firstName,
    lastName,
    address,
    phone
}: UserInterface): Promise<Error | UserReturnInterface> =>  {

    const newUser = await userRepository.create({
      email,
      password,
      firstName,
      lastName,
      address,
      phone,
    });
    const create = await userRepository.save(newUser);
    return create;
};

export const getOneUser = async (id: number): Promise<null | UserReturnInterface> => {
    const result = userRepository.findOneBy({
        id: id
    });

    return result;
}

