import {IList} from './../Common/IObjects';
export interface IDataProvider{
    getAllLists():Promise<IList[]>;
}