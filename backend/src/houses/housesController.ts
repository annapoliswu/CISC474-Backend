import express, { RequestHandler } from 'express';
import { HousesModel } from './housesModel';
import { Database } from '../common/MongoDB';
import { Config } from '../config';
//This is just an example of a second controller attached to the security module

export class HousesController {
    static db: Database = new Database(Config.url, "houses");
    static housesCollection = 'houses';

    getHouse(req: express.Request, res: express.Response){ //set so url param is id, like api/houses/someidhere > see what req.send returns at this route
        const req_id = Database.stringToId(req.params.id);
        HousesController.db.getOneRecord(HousesController.housesCollection, {_id : req_id})
            .then((results) => res.send({fn: 'getHouse', status: 'success', data: results}).end()) //message sent back, see result returned by getOneRecord (aka a data obj)
            .catch((reason) => res.status(500).send(reason).end()); //not sure
    }

    /*request in form {"title":"someData"} 
     *note: MUST have req body as JSON in postmates to work!
     *turning into object and back again to keep format of data when posting?
     *id is returned in data now
     */
    postHouse(req: express.Request, res: express.Response){
        const house : HousesModel = HousesModel.fromObject(req.body); //turns request into HouseModel object
        HousesController.db.addRecord(HousesController.housesCollection, house.toObject())  //turns HouseModel obj back into sendable data
            .then((results) => res.send({fn: 'postHouse', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    postPhoto(req: express.Request, res: express.Response){
        const photo = req.body;
        console.log(photo);

        HousesController.db.addRecord(HousesController.housesCollection, photo)  //turns HouseModel obj back into sendable data
            .then((results) => res.send({fn: 'postHouse', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());
    }

    // {} get all in form of { {obj} , {obj} ...}
    // what is diff bt req.params and req.body ?
    getHouses(req: express.Request, res: express.Response) {
        HousesController.db.getRecords(HousesController.housesCollection, {})
            .then((results) => res.send({fn: 'getHouses', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());

    }
/*

    /getProjects
    //sends a json object with all projects in the system that match :year
    getProjects(req: express.Request, res: express.Response) {
        const semester = req.params.semester;
        ProjectsController.db.getRecords(ProjectsController.projectsTable, { semester: semester })
            .then((results) => res.send({ fn: 'getProjects', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    //getProject
    //sends the specific project as JSON with id=:id
    getProject(req: express.Request, res: express.Response) {
        const semester = req.params.semester;
        const id = Database.stringToId(req.params.id);
        ProjectsController.db.getOneRecord(ProjectsController.projectsTable, { _id: id, semester: semester })
            .then((results) => res.send({ fn: 'getProject', status: 'success', data: results }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
    //addProject
    //adds the project to the database
    addProject(req: express.Request, res: express.Response) {
        const proj: ProjectsModel = ProjectsModel.fromObject(req.body);

        ProjectsController.db.addRecord(ProjectsController.projectsTable, proj.toObject())
            .then((result: boolean) => res.send({ fn: 'addProject', status: 'success' }).end())
            .catch((reason) => res.status(500).send(reason).end());
    }
*/

}