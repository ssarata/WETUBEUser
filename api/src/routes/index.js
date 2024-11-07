import UserRouter from "./UserRouter.js";

const userRouter = new UserRouter();

export default (app) => {
    app.use('/users', userRouter.getRouter());
};
