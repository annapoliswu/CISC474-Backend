import { AppRouter } from "../common/AppRouter";
import { SecurityController } from "./securityController";
import { SecurityMiddleware } from "./securityMiddleware";

//Router for security portion of the api
export class SecurityRouter extends AppRouter{
    
    constructor(){super();}

    //called by the framework to add the routes for the security portion of the API
    setupRoutes(): void {
        const securityController: SecurityController=new SecurityController();
        this.expressRouter.get('/authorize',[SecurityMiddleware.RequireAuth],securityController.authorize)
        this.expressRouter.post('/login',securityController.login);
        this.expressRouter.post('/register',securityController.register);
        this.expressRouter.post('/changepwd',[SecurityMiddleware.RequireAuth],securityController.changePwd);

        this.expressRouter.post('/favorites', securityController.addFavorite);
        this.expressRouter.delete('/:email/favorites/:id', securityController.deleteFavorite);
        //this.expressRouter.post('/addfavorite', [SecurityMiddleware.RequireAuth],securityController.addFavorite);
        this.expressRouter.get('/:email/favorites/', securityController.getFavorites);
        //this.expressRouter.get('/:email/favorites', [SecurityMiddleware.RequireAuth],securityController.getFavorites);
        //this.expressRouter.delete('/favorites', [SecurityMiddleware.RequireAuth],securityController.deleteFavorite);
    }    
}