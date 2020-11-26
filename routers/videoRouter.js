import express from "express";
import { upload, videos, videoDetail, editVideo, deleteVideo } from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);
videoRouter.get(routes.videoDetail, videoDetail);

export default videoRouter; //export default는 파일로 export한다는 뜻