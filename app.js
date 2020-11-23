import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import bodyparser from "body-parser";
import cookieParser from "cookie-parser";
import { localMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(localMiddleware);

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);  //app.use의 의미:누군가 /user로 접속하면 userRouter 전체를 사용
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 import 하면 app object를 준다