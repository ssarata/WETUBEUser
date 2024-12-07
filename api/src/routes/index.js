import AuthRouter from "./AuthRouter.js";
import UserRouter from "./UserRouter.js";
import VideoRouter from "./VideoRouter.js";

const authRouter = new AuthRouter();
const userRouter = new UserRouter();
const videoRouter = new VideoRouter();

export default (app) => {
    app.use('', authRouter.getRouter());
    app.use('/users', userRouter.getRouter());
    app.use('/videos', videoRouter.getRouter());
};
