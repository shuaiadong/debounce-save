### 安装

> npm install debounce-save -S
> or
> yarn add debounce-save

### 触发自动保存的场景
- 数据改发生变时
- 用户关闭页面时
- 组件卸载时

### 注意事项
> autosave 提供了`save` `debouncedSave` ` cancel` ...`api`不要直接调用 ajax请求 -> 破坏 autoSave 内部的生态系统
  - 例如 
     - 用户操作 修改了本次周报 切换 上周周报 
     - state 的数据变成了上周
     - 因为 debounced 是延时执行，触发时 -> 获取数据是上周的数据

> 解决方案 - 用户切换时应该马上触发保存 `api` save

#### 入参

```js

     // 默认参数
              wait: 2000,                   // default 防抖时间
              onSave: null,                 // 自动保存事件(ajax)
              onBeforeSave: null,           // 调用onSave 之前调用
              saveMessage: '确定要离开吗？',   // 提示语
              leading: false,               // 超时前调用
              maxWait: 1,                   // 延迟的最长时间
              trailing: true,               // 超时后调用

```

### api

```js
// 暴露的debounced save 供数据发生改变时调用
debouncedSave

// 直接调用save的方法
save

// 取消事件
cancel

// 清空
flush

// 退出时的事件(组件销毁时 | 直接调用保存事件)
exit
```

### Usage
``` js
import React, {Component} from 'react';
import autoSave from 'debounce-save';

export default class AutoSave extends Component {
      constructor(props) {
      super(props)
          this.autoSave = autoSave({
               onSave: () => {
                    setTimeout(() => {
                      this.setState({log: `value = ${this.state.value},  success`})
                    }, 0)
                    }
          });
        }
          state = {
               value: '',
               log: 'log',
          }
          /**
           * autoSave({})
           * return ->
           *         debouncedSave
           *         save
          */

         render() {
              return <div>
              <p>{this.state.log}</p>
              <input 
              value = {this.state.value}
               onChange = {({target: {value}}) => {
                 this.setState(
                   {value}, 
                    () => this.autoSave.debouncedSave()
                    )
                  }
               }
              />
              </div>

         }
     }
```
### demo
- cd _demo
- npm i
- npm run server
