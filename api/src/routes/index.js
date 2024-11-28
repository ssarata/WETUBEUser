import AuthRouter from "./AuthRouter.js";
import UserRouter from "./UserRouter.js";

const userRouter = new UserRouter();
const authRouter = new AuthRouter();

export default (app) => {
    app.use('', authRouter.getRouter());
    app.use('/users', userRouter.getRouter());
};
