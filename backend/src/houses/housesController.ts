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
    getHouses(req: express.Request, res: express.Response) {
        HousesController.db.getRecords(HousesController.housesCollection, {})
            .then((results) => res.send({fn: 'getHouses', status: 'success', data: results}).end())
            .catch((reason) => res.status(500).send(reason).end());

    }

    deleteHouse(req: express.Request, res: express.Response) {
        const id = Database.stringToId(req.params.id);
        HousesController.db.deleteRecord(HousesController.housesCollection, { _id: id })
            .then((results) => results ? (res.send({ fn: 'deleteHouse', status: 'success' })) : (res.send({ fn: 'deleteHouse', status: 'failure', data: 'Not found' })).end())
            .catch((reason) => res.status(500).send(reason).end());
    }


    
}