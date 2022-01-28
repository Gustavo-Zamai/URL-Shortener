import express from 'express';
import { Request, Response } from 'express';
import { URLController } from '../controller/URLController';
import { MongoConnection } from '../database/mongoConnection';

const api = express();
api.use(express.json());

const database = new MongoConnection()
database.connect();

const urlController = new URLController();
api.post('/shortener', urlController.shortener);
api.get('/:hash', urlController.redirect);

api.listen(3001, () => console.log('Express running!')); 