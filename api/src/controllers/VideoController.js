import * as status from "../constantes/httpStatus.js";
import VideoService from "../services/VideoService.js";
import ValidationError from "../utils/validatators/validationError.js";
import VideoValidator from "../utils/validatators/videoValidatator.js";
import UserService from "../services/UserService.js";
import fs from "fs/promises";
import { mediaDir } from "../utils/multerUpload.js";

export default class VideoController {
    videoService;
    userService;

    constructor(){
        this.videoService = new VideoService();
        this.userService = new UserService();
    }

    static renameVideoPath(file, slug) {        
        const file_name_part = file.originalname.split('.');
        const extname = file_name_part[file_name_part.length -1] 
        const new_path = `${mediaDir}/${slug}.${extname}`;       
        fs.rename(file.path, new_path);
        return new_path;
    }

    async createVideo(req, res){
        const data = req.body;
        const file = req.file;
        
        const videoValidator = new VideoValidator();
        const _video = videoValidator.createProxy();

        let new_path = null;

        if (file !== undefined) {
            new_path = VideoController.renameVideoPath(file,  data.title.replace(/\s/g, '').toLowerCase());
        } 

        try {
            _video.title = data.title;
            _video.description = data.description;
            _video.mediaPath = new_path !== null && new_path || mediaDir+"/default.mp4";
            _video.status = data.status == "true";
            _video.userId = parseInt(data.userId);
            
            if (
                (await this.videoService.filter(_video.title)) !== null
            ){
                throw new ValidationError("Une video avec ce titre existe déjà. ");
            }
            if (
                (await this.userService.get(_video.userId)) === null
            ){
                throw new ValidationError("L'utilisateur avec cet id n'existe pas. ");
            }

            const video = await this.videoService.create(_video);
            res.status(status.HTTP_200_OK).json(video);

        } catch (error) {
            if (file !== undefined){
                fs.rm(new_path);
            }
            if (error instanceof ValidationError) {
                return res.status(status.HTTP_400_BAD_REQUEST).json({
                    "message" : error.message
                });
            } else {
                console.log(error);
                res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).send({});
            }
        }
    }

    async getVideos(req, res){
        try {
            const video = await this.videoService.getAll();
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({});
        }
    }

    async getVideo(req, res){
        const { id } = req.params;
        
        try {
            const video = await this.videoService.get(parseInt(id));
            if (video !== null) {
                res.status(status.HTTP_200_OK).json(video);
                return
            } 
            res.status(status.HTTP_404_NOT_FOUND).json({
                "message" : "Video not found <) !"
            });
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({});
        }
    }

    async getStreamVideo(req, res){
        const { id } = req.params;
        
        try {
            const video = await this.videoService.get(parseInt(id));
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async updateVideo(req, res){
        const { id } = req.params;
        const data = req.body;
        const file = req.file;
        
        const videoValidator = new VideoValidator();
        const _video = videoValidator.createProxy();

        let new_path = null;

        if (file !== undefined) {
            new_path = VideoController.renameVideoPath(file,  data.title.replace(/\s/g, '').toLowerCase());
        } 

        try {
            const currentPreviousVideo = await this.videoService.get(parseInt(id));
            
            if ( currentPreviousVideo === null){
                return res.status(status.HTTP_404_NOT_FOUND).json({
                    "message" : "Video not found <) !"
                }); 
            }

            _video.title = data.title;
            _video.description = data.description;

            _video.mediaPath = new_path !== null && new_path || mediaDir+"/default.mp4";
            
            _video.status = data.status == "true";
            _video.userId = parseInt(data.userId);
            
            if (
                (await this.videoService.filter(_video.title)).id !== id
            ){
                throw new ValidationError("Une video avec ce titre existe déjà. ");
            }
            if (
                (await this.userService.get(_video.userId)) === null
            ){
                throw new ValidationError("L'utilisateur avec cet id n'existe pas. ");
            }

            const video = await this.videoService.update(id, _video);
            res.status(status.HTTP_200_OK).json(video);

        } catch (error) {
            if (file !== undefined){
                fs.rm(new_path);
            }
            if (error instanceof ValidationError) {
                return res.status(status.HTTP_400_BAD_REQUEST).json({
                    "message" : error.message
                });
            } else {
                console.log(error);
                res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).send({});
            }
        }
    }

    async deleteVideo(req, res){
        const { id } = req.params;
        
        try {
            const video = await this.videoService.get(parseInt(id));
            if (video !== null) {
                await this.videoService.delete(parseInt(id));
                res.status(status.HTTP_200_OK).json(video);
                return;
            } 
            res.status(status.HTTP_404_NOT_FOUND).json({
                "message" : "Video not found <) !"
            });            
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json({});
        }
    }
}


