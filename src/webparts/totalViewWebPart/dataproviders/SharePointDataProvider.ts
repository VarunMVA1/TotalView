import {IList } from './../Common/IObjects';
import { IDataProvider } from './IDataProvider';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientConfiguration } from '@microsoft/sp-http';

export default class SharePointDataProvider implements IDataProvider{
    private _webPartContext: IWebPartContext;
    private _webAbsoluteUrl:string;

    constructor(_context: IWebPartContext){
        this._webPartContext = _context;
        this._webAbsoluteUrl = _context.pageContext.web.absoluteUrl;
    }
    public getAllLists():Promise<IList[]>{
       let _items: IList[];

       return this._webPartContext.spHttpClient
       .get(this._webAbsoluteUrl+"/_api/web/lists",SPHttpClient.configurations.v1)
       .then((response: any)=>{
           if(response.status >= 200 && response.status <300){
               return response.json();
           }else{
               return Promise.reject(new Error(JSON.stringify(response)));
           }
       })
       .then((data:any)=>{
           console.log(data);

        _items =[];              
        if(data){  
            for(let i=0; i< data.value.length; i++){  
                let item = data.value[i];  
                var lst: IList ={  
                    Title: item.Title,  
                    Id: item.Id,
                    Hidden:item.Hidden,
                    BaseType:item.BaseType,
                    BaseTemplate:item.BaseTemplate
                }  
                _items.push(lst);  
            }  
        }  

        return _items;  
        }).catch((ex)=>{  
            console.log("Error in retrieving List from site");  
            throw ex;  
        }); 

    
    }

}