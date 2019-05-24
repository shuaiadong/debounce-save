### 安装

> npm install debounce-save -D
> or
> yarn debounce-save

### 延时触发自动保存的好处

    - 不会触发多次自动保存事件

### 触发自动保存的场景

- 数据改发生变时
- 用户关闭页面时
- 组件卸载时
- 数据将要发生改变时
  - 例如 修改了本次周报 切换上周周报（此时应该马上触发保存 - 不然 debouncedSave 触发时获取的数据是切换那周的数据）

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

### 提供的方法

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

### todo

-
