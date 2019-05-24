import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import axios from 'axios'

@inject('app')
@observer
export default class Apps extends React.Component {

    constructor(props) {
      super(props)
    }
    get local () {
        return this.props.app
    }
  
    componentWillUnmount() {
      console.log('组件卸载时直接调用')
      this.local.autoSave && this.local.autoSave.exit()
    }
  
    render () {
        console.log(this.local)
      return (
        <div className="App">
            <button
            onClick= {
                () => {
                    debugger
                    this.local.autoSave.debouncedSave()
                    // this.local.autoSave.save()
                }
            }
            > 直接保存(save) </button><span>直接保存后之前的debouncedSave也不会触发</span>
            <br/>
            <br/>
            <button> debouncedSave (延时保存)</button>
            <br/>
            <br/>
            <button> 取消 debounced (cancel) </button>
            <br/>
            <br/>
            <button>exit</button><br/>
  
            <textarea 
            value={this.local.saveData.textVal} 
            onChange={({target: {value}}) => {
              this.local.upata({textVal: value})
            }
          }
            ></textarea>
        </div>
      );
    }
}