import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(
    helmet({
        contentSecurityPolicy: false,
    })
);
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads")); //file 을 directory에 전달하는 middleware, 경로가 uploads라면 uploads라는 directory안으로 file이 들어감
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);  //app.use의 의미:누군가 /user로 접속하면 userRouter 전체를 사용
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 import 하면 app object를 준다