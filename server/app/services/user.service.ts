import { DeleteResult } from "typeorm";
import { AppDataSource } from "../database";
import { User } from "../entities/user.entity";
import { BadRequestError, ErrorInterface } from "../utils/error";
import bcryptjs from "bcryptjs";
import { Address } from "../entities/address.entity";
import { failed, success } from "../utils/response";
import sendMail from "../utils/mailer";
import jwt from "jsonwebtoken";
import { Token } from "../entities/token.entity";
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
  verifyAt?: string;
  role?: UserRole;
}

interface UserReturnInterface extends UserInterface {
  role: UserRole;
  createAt: Date;
  isActive: boolean;
  id: number;
}

export const userRepository = AppDataSource.getRepository(User);
const addressRepository = AppDataSource.getRepository(Address);
const tokenRepository = AppDataSource.getRepository(Token);

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
  const emailHash = bcryptjs.hashSync(email, 8);

  // mailer.sendMail(user.email, "Verify Email", `<a href="${process.env.APP_URL}/verify?email=${user.email}&token=${hashedEmail}"> Verify </a>`)
  const newUser = userRepository.create({
    email,
    password: passwordHash,
    firstName,
    lastName,
    phone,
  });
  const rs = await userRepository.save(newUser);
  await sendMail(
    email,
    "Verify your email",
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <html lang="en">
  
    <head></head>    
    <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
      <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em">
        <tr style="width:100%">
          <td>
            <table style="padding:30px 20px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-logo.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <table style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" />
                    <table width="100%" style="padding:20px 40px;padding-bottom:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td>
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Hi ${email},</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">Please click button to verify your email</h2>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="100%" style="padding:20px 40px;padding-top:0" align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td colSpan="2" style="display:flex;justify-content:center;width:100%"><a href="http://localhost:3000/api/user/verify?email=${email}&token=${emailHash}" target="_blank" style="background-color:#e00707;padding:0px 0px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;line-height:100%;text-decoration:none;display:inline-block;max-width:100%"><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%;mso-text-raise:0" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#e00707;padding:12px 30px;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;max-width:100%;display:inline-block;line-height:120%;text-decoration:none;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Verify</span><span><!--[if mso]><i style="letter-spacing: undefinedpx;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style="padding:45px 0 0 0" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png" width="620" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105, U.S.A. | www.yelp.com</p>
          </td>
        </tr>
      </table>
    </body>
  
  </html>`
  );
  return rs ? rs : BadRequestError("register failed");
};

export const verify = async (
  email: string,
  token: string
): Promise<ErrorInterface | UserReturnInterface> => {
  const comp = bcryptjs.compareSync(email, token);
  let result: User | null = null;
  if (comp) {
    result = await userRepository.findOneBy({
      email,
    });
    if (result?.verifyAt === null) {
      await userRepository.update(
        { id: result.id },
        { verifyAt: String(Date.now()) }
      );
    } else {
      return BadRequestError("Email was verified");
    }
  }

  return result ? result : BadRequestError("user not found!");
};

export const forgotPwd = async (email: string) => {
  const user = await userRepository.findOneBy({
    email,
  });
  if (!user) {
    return BadRequestError("User not found");
  }
  const srk = (process.env.JWT_SECRET_KEY as string) + user.password;
  const otp = Math.floor(99999 + Math.random() * 900000);
  const tokenReset = jwt.sign(
    {
      otp,
      id: user.id,
    },
    srk,
    { expiresIn: "10m" }
  );
  const updateTokenRS = await tokenRepository.save(
    tokenRepository.create({
      tokenName: "resetPassword",
      tokenValue: tokenReset,
      user,
      expire: "10m",
    })
  );
  await sendMail(
    email,
    "OTP reset password",
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <html lang="en">
    
      <head></head>
    
      <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
          <tr style="width:100%">
            <td><img alt="Plaid" src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png" width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
              <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">Verify Your Identity</p>
              <h1 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to finish linking Venmo.</h1>
              <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td>
                      <p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${otp}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Not expecting this email?</p>
              <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Contact <a target="_blank" style="color:#444;text-decoration:underline" href="mailto:login@plaid.com">login@plaid.com</a> if you did not request this code.</p>
            </td>
          </tr>
        </table>
        <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">Securely powered by Plaid.</p>
      </body>
    
    </html>`
  );
  return updateTokenRS
    ? updateTokenRS
    : BadRequestError("Email can not send to you");
};

export const resetPwd = async (
  email: string,
  otp: string,
  newPassword: string
) => {
  const user = await userRepository.findOneBy({
    email,
  });
  if (!user) {
    return BadRequestError("User not found");
  }
  const resetToken = await tokenRepository.findOne({
    where: {
      tokenName: "resetPassword",
    },
  });
  if (!resetToken) {
    return BadRequestError("token is not valid");
  }
  const srk = (process.env.JWT_SECRET_KEY as string) + user.password;
  const decode = jwt.verify(resetToken.tokenValue, srk);
  if (typeof decode === "object" && decode !== null) {
    const payload = decode as { [key: string]: string };

    if (Number(payload.otp) === Number(otp)) {
      user.password = bcryptjs.hashSync(newPassword, 8);
      return (await userRepository.update({ email }, user)).affected
        ? success()
        : failed();
    } else {
      return BadRequestError("OTP is not valid!", 400);
    }
  }
  return BadRequestError("can't update password", 500);
};

export const getOne = async (
  id: number
): Promise<ErrorInterface | UserReturnInterface> => {
  const result = await userRepository.findOne({
    where: {
      id,
    },
    relations: {
      address: true,
    },
  });
  return result ? result : BadRequestError("user not found!");
};

export const updateOne = async (id: number, user: UserInterface) => {
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

  return (await userRepository.update({ id }, user)).affected
    ? success()
    : failed();
};

export const deleteOne = async (
  id: number
): Promise<ErrorInterface | DeleteResult> => {
  const findUser = await userRepository.findOneBy({ id });
  if (!findUser) return BadRequestError("user not found!");

  return await userRepository.delete({ id });
};

export const getAll = async (limit: number, page: number) => {
  const offset = (page - 1) * limit;
  const [result, count] = await userRepository.findAndCount({
    take: limit,
    skip: offset,
  });
  const last_page = Math.ceil(count / limit);
  const prev_page = page - 1 < 1 ? null : page - 1;
  const next_page = page + 1 > last_page ? null : page + 1;
  return result.length
    ? {
        current_page: page,
        prev_page,
        next_page,
        last_page,
        data_per_page: limit,
        total: count,
        data: result,
      }
    : BadRequestError("user not found!");
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
      id,
    },
    relations: {
      address: true,
    },
  });
  if (!addr) return BadRequestError("address empty");
  if (!user) return BadRequestError("user not found!");
  const new_addr = addressRepository.create({
    address: addr,
    user: user,
  });
  const rs = await addressRepository.save(new_addr);
  const { default_address } = user;
  if (!default_address)
    await userRepository.update({ id }, { default_address: rs.id });
  const { id: id_addr, address } = rs;
  return {
    id: id_addr,
    address,
  };
};

export const setDefaultAddress = async (id_user: number, id_addr: number) => {
  const user = await userRepository.findOne({
    where: {
      id: id_user,
    },
    relations: {
      address: true,
    },
  });
  if (!user) return BadRequestError("user not found!");
  if (user.address.find(({ id }) => id === id_addr)) {
    return (
      await userRepository.update({ id: id_user }, { default_address: id_addr })
    ).affected
      ? success()
      : failed();
  }
  return BadRequestError("id address not found");
};

export const updateAddress = async (
  id_user: number,
  id_addr: number,
  addr: string
) => {
  const address = await addressRepository.findOne({
    where: {
      id: id_addr,
    },
    relations: {
      user: true,
    },
  });
  if (!address) return BadRequestError("address not found");
  if (address.user.id !== id_user)
    return BadRequestError("you dont have this address id");
  if (!addr) return BadRequestError("address empty");
  return (await addressRepository.update({ id: id_addr }, { address: addr }))
    .affected
    ? success()
    : failed();
};

export const deleteAddress = async (id_user: number, id_addr: number) => {
  const address = await addressRepository.findOneBy({ id: id_addr });
  const user = await userRepository.findOne({
    where: {
      id: id_user,
    },
    relations: {
      address: true,
    },
  });
  if (!address) return BadRequestError("address not found");
  if (!user) return BadRequestError("user not found");
  let deleted = false;
  let index = 0;
  for (const { id } of user.address) {
    if (id === id_addr) {
      if (user.default_address === id) {
        user.address.splice(index, 1);
        if (user.address.length)
          await userRepository.update(
            { id: id_user },
            { default_address: user.address.at(0)?.id }
          );
        else
          await userRepository.update({ id: id_user }, { default_address: 0 });
      }
      await addressRepository.delete({ id });
      deleted = true;
    }
    index++;
  }
  if (deleted) return success();
  else return BadRequestError("you dont have this address id");
};

export const changePassword = async (
  id: number,
  old_password: string,
  new_password: string
) => {
  const user = await userRepository.findOneBy({ id });
  if (!old_password || !new_password)
    return BadRequestError("password cannot empty");
  if (!user) return BadRequestError("error when retrieve user data");
  if (!bcryptjs.compareSync(old_password, user.password))
    return BadRequestError("old password is not correct");
  return (
    await userRepository.update(
      { id },
      { password: bcryptjs.hashSync(new_password, 8) }
    )
  ).affected
    ? success()
    : failed();
};
