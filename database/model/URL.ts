import { props, Typegoose} from '@hasezoey/typegoose';
export class URL extends Typegoose{
    [x: string]: any;
    @prop [{required: true}];
    hash: string;

    @prop [{required: true}];
    originURL: string;

    @prop [{required: true}];
    shortURL: string;
}

export const URLModel = new URL().getModelForClass(URL);