import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { HousesController } from "./housesController";

//This is just an example second router to show how additional routers can be added
export class HousesRouter extends AppRouter{
    static hController: HousesController = new HousesController();
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {  
        //going to ../api/project/sometitle calls getHouse for that titled house
        //whatever is behind colons is params. so req.params.title is whatever was at the end of that url
        this.expressRouter.get('/:id', HousesRouter.hController.getHouse); 

        this.expressRouter.get('/', HousesRouter.hController.getHouses); 
        this.expressRouter.post('/', HousesRouter.hController.postHouse);
        this.expressRouter.post('/photo', HousesRouter.hController.postPhoto); //cannot post via url? must use postmates with req as JSON
        /*
        this.expressRouter.get('/semesters',ProjectsRouter.projController.getSemesters);
        this.expressRouter.get('/projectNumbers/:semester',ProjectsRouter.projController.getProjectNumbers);
        this.expressRouter.get('/:semester',ProjectsRouter.projController.getProjects);
        this.expressRouter.get('/:semester/:id',ProjectsRouter.projController.getProject);
        this.expressRouter.post('/',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.addProject);
        this.expressRouter.put('/:id',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.updateProject);
        this.expressRouter.delete('/:id',[SecurityMiddleware.RequireAuth],ProjectsRouter.projController.deleteProject);
        */
    }    
}