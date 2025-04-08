import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Nguoidung from "../models/nguoidung.model.js";
import * as dotenv from "dotenv";
dotenv.config();


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    passReqToCallback: true,
  },

  async (req, accessToken, refreshToken, profile, done) => {
    try {
      let user = await Nguoidung.findOne({ googleId: profile.id });

      if (!user) {
        // check xem có người dùng nào đã đăng ký bằng email và có mật khẩu chưa
        user = await Nguoidung.findOne({ email: profile.emails[0].value });
      
        if (user && user.matKhau) {
          return done(null, false, { message: "Email này đã đăng ký bằng mật khẩu" });
        }
      
        if (!user) {
          user = await Nguoidung.create({
            googleId: profile.id,
            tenNguoiDung: profile.displayName,
            email: profile.emails[0].value,
            anhND: profile.photos[0].value,
          });
        }
      }
      return done(null, user);
      
    } catch (error) {
      return done(error, null);
    }
  }
));

export default passport;