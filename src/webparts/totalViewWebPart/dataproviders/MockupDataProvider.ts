import { IList } from './../Common/IObjects';
import { IDataProvider } from './IDataProvider';
export default class MockupDataProvider implements IDataProvider{
    constructor(){

    }

    public getAllLists(): Promise<IList[]>{
        let _items: IList[];

        _items = [
            {
                Title:" List Name 1",
                Id:'1'
            },{
                Title:" List Name 2",
                Id:'2'
            },{
                Title:" List Name 3",
                Id:'3'
            }
        ];

        return new Promise<IList[]>((resolve)=>{
            setTimeout(() =>{
                resolve(_items);
            },1000);
        });
    }
}