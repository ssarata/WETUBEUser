import * as status from "../constantes/httpStatus.js";
import VideoService from "../services/VideoService.js";
import VideoValidator from "../utils/validatators/videoValidatator.js";

export default class videoController {
    videoService;

    constructor(){
        this.videoService = new VideoService();
    }

    async createVideo(req, res){
        const {title, description, mediaPath, status, videoId} = req.body;

        const videoValidator = new VideoValidator();
        const _video = videoValidator.createProxy();

        try {    
            _video.title = title;
            _video.description = description;
            _video.mediaPath = mediaPath;
            _video.status = status;
            _video.videoId = videoId;

            const video = await this.videoService.create(_video);
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            res.send({
                error: error.message
            });
        }
    }

    async getVideos(req, res){
        try {
            const video = await this.videoService.getAll();
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }

    async getVideo(req, res){
        const { id } = req.params;
        
        try {
            const video = await this.videoService.get(parseInt(id));
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
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
        const {title, description, mediaPath, status, videoId} = req.body;

        const videoValidator = new VideoValidator();
        const _video = videoValidator.createProxy();
        
        try {    
            _video.title = title;
            _video.description = description;
            _video.mediaPath = mediaPath;
            _video.status = status;
            _video.videoId = videoId;

            const video = await this.videoService.create(_video);
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            res.send({
                error: error.message
            });
        }
    }

    async deleteVideo(req, res){
        const { id } = req.params;
        
        try {
            const video = await this.videoService.delete(parseInt(id));
            res.status(status.HTTP_200_OK).json(video);
        } catch (error) {
            console.error(error);
            res.status(status.HTTP_500_INTERNAL_SERVER_ERROR).json();
        }
    }
}


