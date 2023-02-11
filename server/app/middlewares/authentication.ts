import passport from "passport"

export const verifyToken = () => {
    return passport.authenticate('jwt', { session:false });
}