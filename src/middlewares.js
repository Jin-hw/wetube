import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_PRIVATE_KEY,
    region: "ap-northeast-2"
})

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "hwtube/videos"
    })
})

const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: "hwtube/avatars"
    })
})

//const multerVideo = multer({ dest: "uploads/videos/" });
//'/uploads/videos/'라고 쓰면 로컬 내부의 경로라고 생각하고 로컬 경로에 uploads를 만듦
//const multerAvatar = multer({ dest: "uploads/avatars/" });

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

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
