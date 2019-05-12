import { IList } from '../Common/IObjects';
interface ITotalViewWebPartState{
    lists?:IList[];    
    hiddenLists?:IList[];
    libraries?:IList[];
    others?:IList[];
}
export default ITotalViewWebPartState;