import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
//'/uploads/videos/'라고 쓰면 로컬 내부의 경로라고 생각하고 로컬 경로에 upload를 만듦

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");