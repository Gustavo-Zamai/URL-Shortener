import { Request, Response } from 'express';
import shortid from 'shortid';
import { config } from '../config/constants'
import { URLModel } from '../database/model/URL';

export class URLController{
    public async shortener(req: Request, res: Response): Promise<void>{
        //verify URL
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL})
        if (url) {
            res.json(url);
            return
        }
        
        //create hash to URL 
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`;

        //save URL into Database
        const newUrl = await URLModel.create({ hash, shortURL, originURL})
        res.json(newUrl);
        //return URL 
        res.json({ originURL, hash, shortURL})
    }

    public async redirect(req: Request, res: Response): Promise<void>{
         //catch hash error
        const { hash } = req.params;

        //
        const url = await URLModel.findOne({ hash })
        if (url){
            res.redirect(url.originURL)
            return
        }
        res.status(400).json({ error: 'URL not found'})

         //find original URL
         const url = {
             originURL: ' ',
             hash: ' ',
             shortURL: ' ',
         }
         //redirect to original URL
         res.redirect(url.originURL)
         
    }
}