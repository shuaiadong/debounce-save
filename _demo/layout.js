import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import App from './app';

@inject('app')
@observer
export default class Apps extends React.Component {
    constructor(props) {
      super(props)
    }

    get local () {
        return this.props.app
    }
    renderRadme() {
        return <React.Fragment> 
        <pre>
          // 入参
          {`/**
          {
            // 默认参数
                     wait: 2000,                   // default 防抖时间
                     onSave: null,                 // 自动保存事件(ajax)
                     onBeforeSave: null,           // 调用onSave 之前调用 
                     saveMessage: '确定要离开吗？',   // 提示语
                     leading: false,               // 超时前调用
                     maxWait: 1,                   // 延迟的最长时间
                     trailing: true,               // 超时后调用
          }
          * 
          */`}
        </pre>
        <pre>
          // 返回值
          {`/**
          *
          *  1.  debouncedSave
          *      - debouncedSave  | func
          * 
          *  2. 直接保存
          *      - save           | func
          * 
          *  3.  取消 debounced 
          *      - cancel         | func
          * 
          *  4. 清空
          *      - flush          | func   
          * 
          *  5. 退出 （组件卸载时）会直接调用保存接口
          *      - exit           | func
          * 
          * 
          */`}
        </pre>
        </React.Fragment>
      }

    render() {
        return <div>
                 <div
                 dangerouslySetInnerHTML={{__html: this.local.saveInfo}}>
                 </div>

                 <br/>
                    <button onClick={()=> this.local.upData(
                        {
                        showReanme: !this.local.showReanme
                        }
                    )}> 模拟组件 </button>
                 <br/>

                 { this.local.showReanme && this.renderRadme()}
                {!this.local.showReanme && <App></App>}
        
        </div>
    }
}