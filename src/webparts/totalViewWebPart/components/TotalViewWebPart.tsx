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
              <h3 className={ styles.title }>Welcome to SharePoint Framework Webpart with React!</h3>
              <span className={ styles.subTitle }>Integration with GITHUB & Azure Devops for CI/CD.</span>
              <ProgressIndicator className={ styles.label } label="Total Lists &amp; Libraries" description={this.state.lists.length.toString()} percentComplete={this.state.lists.length/this.state.lists.length} />
              <ProgressIndicator className={ styles.label } label="Total Libraries" description={this.state.libraries.length.toString()} percentComplete={this.state.libraries.length/this.state.lists.length} />
              <ProgressIndicator className={ styles.label } label="Total Lists" description={this.state.others.length.toString()} percentComplete={this.state.others.length/this.state.lists.length} />
              <ProgressIndicator className={ styles.label } label="Hidden Lists &amp; Libraries" description={this.state.hiddenLists.length.toString()} percentComplete={this.state.hiddenLists.length/this.state.lists.length} />
            </div>
          </div>
        </div>
      );
    }
}
