import express from "express";
import routes from "../routes";
import { postAddComment, postRegisterView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
//Database를 변경할 필요가 없으면 GET, 변경할 필요가 있으면 POST
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;