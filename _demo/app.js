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
      return (
        <div className="App">
            <p>ci  demo</p>
            <button
            onClick= {
                () => {
                    this.local.autoSave.save()
                    // this.local.autoSave.save()
                }
            }
            > 直接调用保存(save) </button><span>直接保存后之前的debouncedSave也不会触发</span>
            <br/>
            <br/>
            <button
            onClick= {
              () => {
                 this.local.autoSave.debouncedSave()
              }
          }
            > debouncedSave (延时保存)  / 直接在textarea输入文字等待 </button>
            <br/>
            <br/>
            <button
            onClick= {
              () => {
                  this.local.autoSave.cancel()
              }}
            > 取消 debounced (cancel) </button>
            <br/>
            <br/>
            <button
            onClick= {
              () => {
                  this.local.autoSave.exit()
              }}
            >exit 退出 </button><br/>
  
            <textarea
              style= {
                {width: '70%', height: '200px'}
              }
            value={this.local.saveData.textVal}

            onChange={({target: {value}}) => {

              this.local.setProps(this.local.saveData, {textVal: value})

            }
          }
            ></textarea>
        </div>
      );
    }
}