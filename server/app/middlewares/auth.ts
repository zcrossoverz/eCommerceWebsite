/* eslint-disable @typescript-eslint/no-unsafe-return */
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AppDataSource } from "../database";
import { User } from "../entities/user.entity";

passport.use(
  "authz",
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      const { user_id, role } = payload;
      if (!user_id || !role) {
        return done("token is not valid!");
      }
      if (role === "admin") return done(null, payload);
      return done("you dont have permission to do this", false);
    }
  )
);

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      const { user_id, firstName, lastName, role } = payload;
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id: user_id });
      if (
        !user_id ||
        !firstName ||
        !lastName ||
        !role ||
        !user ||
        user.id != user_id ||
        user.role != role
      ) {
        return done("token is not valid!", false);
      }
      return done(null, {
        user_id,
        firstName,
        lastName,
        role,
      });
    }
  )
);

export const verifyToken = () => {
  return passport.authenticate("jwt", { session: false });
};

export const require_admin = () => {
  return passport.authorize("authz", { failWithError: false });
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface User {
      user_id: number;
      firstName: string;
      lastName: string;
      role: string;
    }
  }
}
