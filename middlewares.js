import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });
//'/uploads/videos/'라고 쓰면 로컬 내부의 경로라고 생각하고 로컬 경로에 upload를 만듦
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");