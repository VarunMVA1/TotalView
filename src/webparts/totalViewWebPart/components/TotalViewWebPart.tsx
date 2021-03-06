import * as React from 'react';
import styles from './TotalViewWebPart.module.scss';
import { ITotalViewWebPartProps } from './ITotalViewWebPartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ITotalViewWebPartState from './ITotalViewWebPartState';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { IDataProvider } from './../dataproviders/IDataProvider';
import { IList } from './../Common/IObjects';


export default class TotalViewWebPart extends React.Component<ITotalViewWebPartProps, ITotalViewWebPartState> {
  constructor(props:ITotalViewWebPartProps){
    super(props);
    this.state={
      lists:[],      
      libraries:[],
      others:[],
      hiddenLists:[]
    };
  }

  public componentDidMount(){
    this.props.provider.getAllLists().then((_lists: IList[])=>{      
      let _hiddenLists = _lists.filter(e=>e.Hidden === true);
      let _libraries = _lists.filter(e=>e.BaseType === 1);
      let _others = _lists.filter(e=>e.BaseType != 1);
      this.setState({
        lists:_lists,        
        hiddenLists:_hiddenLists,
        libraries:_libraries,
        others:_others
      });
    });
  }

  public render(): React.ReactElement<ITotalViewWebPartProps> {
      return (
        <div className={ styles.totalViewWebPart }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <p><h2 className={ styles.label }>Welcome to SharePoint Framework Webpart with React!</h2></p>
              <p><h3 className={ styles.label }>Integration with GITHUB & Azure Devops for CI/CD.</h3></p>
              <div  className={ styles.label } >Sum of Lists & Libraries</div>
            </div>
            <div className={ styles.row }>
              <div  className={ styles.label } >Total Lists & Libraries</div>
              <ProgressIndicator className={ styles.label } barHeight={10} percentComplete={this.state.lists.length/this.state.lists.length} />
              <div className={styles.label}>{this.state.lists.length.toString()}</div>
              <div  className={ styles.label } >Total Libraries</div>
              <ProgressIndicator className={ styles.label } barHeight={10}  percentComplete={this.state.libraries.length/this.state.lists.length} />
              <div className={styles.label}>{this.state.libraries.length.toString()}</div>
              <div  className={ styles.label } >Total Lists</div>
              <ProgressIndicator className={ styles.label } barHeight={10}  percentComplete={this.state.others.length/this.state.lists.length} />
              <div className={styles.label}> { this.state.others.length.toString() } </div>
              <div  className={ styles.label }>Hidden Lists & Libraries</div>
              <ProgressIndicator className={ styles.label } barHeight={10}  percentComplete={this.state.hiddenLists.length/this.state.lists.length} />
              <div className={styles.label}> { this.state.hiddenLists.length.toString() } </div>
            </div>
          </div>
        </div>
      );
    }
}
