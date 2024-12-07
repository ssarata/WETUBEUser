import express from "express";
import VideoController from "../controllers/VideoController.js";
import upload from "../utils/multerUpload.js";


export default class VideoRouter {
    router;
    videoController;

    constructor(){
        this.router = express.Router();
        this.videoController = new VideoController();
        this.initializeRoutes();
    }

    initializeRoutes(){
        this.router.get("/", this.videoController.getVideos.bind(this.videoController));
        this.router.post("/", upload.single("mediaPath"), this.videoController.createVideo.bind(this.videoController));
        this.router.get("/:id", this.videoController.getVideo.bind(this.videoController));
        this.router.put("/:id", upload.single("mediaPath"), this.videoController.updateVideo.bind(this.videoController));
        this.router.delete("/:id", this.videoController.deleteVideo.bind(this.videoController));
    }

    getRouter(){
        return this.router;
    }
}


