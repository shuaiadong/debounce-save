import debounce from 'lodash/debounce'

/**
 * autoSave
 * @public
 * @param {options}
 * @return {saveHelp}
 */

/**
 * @public
 * @typedef {{}} options
 * @param  {number} [wait = 2000] - 防抖时间
 * @param  {function} [onSave] - 自动保存事件
 * @param  {function} [onBeforeSave] - 调用_save保存之前调用 return false 取消 保存
 * @param  {string} [saveMessage = 确定要离开吗？]
 * @param  {boolean} [leading = false] - 超时前调用
 * @param  {number} [maxWait = 0] -  延迟的最长时间
 * @param  {boolean} [trailing = true] - 超时后调用
 */

/**
 * @public
 * @typedef {{}} saveHelp
 * @param  {function} [debouncedSave] - debounced save
 * @param  {function} [save] - 直接保存
 * @param  {function} [cancel] - 取消当前的debouncedSave
 * @param  {function} [flush] - 清空
 * @param  {function} [exit] - 退出
 */

/**
 * 1. 自动保存防抖
 * 2. 离开浏览器 | 刷新浏览器 - 选择取消时保存
 * 3. 组件卸载时保存
 */

// 返回值
/**
 *
 *  1.  debouncedSave
 *      - debouncedSave  | func
 *  2. 直接保存
 *      - save           | func
 *  3.  取消 debounced
 *      - cancel         | func
 *  4. 清空
 *      - flush          | func
 *  5. 退出
 *      - exit           | func
 *
 */

const _Utils_ = {
  addEvent(element, type, callback) {
    if (element.addEventListener) {
      element.addEventListener(type, callback, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, callback)
    } else {
      element['on' + type] = callback
    }
  },
  removeEvent(element, type, callback) {
    if (element.removeEventListener) {
      element.removeEventListener(type, callback, false)
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, callback)
    } else {
      element['on' + type] = null
    }
  },
  isFunc(func) {
    typeof func === 'function'
  }
}

class AutoSave {
  constructor(props) {
    this.debouncedSave = this.debouncedSave.bind(this)
    Object.assign(this.opts, props)
  }
  startTime = ''
  opts = {
    // 默认入参
    wait: 2000, // 防抖时间
    onSave: null, // 自动保存事件 传递过来
    onBeforeSave: null, // 调用_save保存之前调用 return false 取消 保存
    saveMessage: '确定要离开吗？',
    leading: false, // 超时前调用
    maxWait: 0, // 延迟的最长时间
    trailing: true // 超时后调用
  }

  /**
   *  true > 可以绑定定时间
   *  || 为了不重复绑定事件
   *  || 数据改变的识别
   */
  saved = true

  // 统一处理保存事
  async _save(...args) {
    if (this.saved || !this.opts.onSave) {
      return
    }
    if (this.opts.onBeforeSave && this.opts.onBeforeSave(...args) === false) {
      return
    }
    await this.opts.onSave(...args)
    this.removeBeforunload()
  }

  // 私有防抖的_save
  _debouncedSave = debounce(
    this._save,
    this.opts.wait,
    {},
    {
      leading: this.opts.leading,
      maxWait: this.opts.maxWait,
      trailing: this.opts.trailing
      // lodash 参数
    }
  )

  // 暴露的 onSave 调用方法
  debouncedSave(...args) {
    // this.startTime && (this.startTime = Date.now());
    // if(Date.now() - this.startTime > this.opts.wait) {
    //   return this.save() // 直接保存
    // }
    this.saved && this.addBeforunload()
    this._debouncedSave(...args)
  }
  // 直接保存
  save(...args) {
    this.saved = false
    this._save(...args)
  }
  // debounced 取消
  cancel = () => {
    this._debouncedSave.cancel()
    this.removeBeforunload()
  }
  // 清空
  flush = () => {
    this._debouncedSave.flush()
    this.removeBeforunload()
  }

  /**
   * window.unload | exit
   *  1. Beforeunload 处理
   *  2. 组件销毁时：路由切换页面时
   *  */
  addBeforunload() {
    if (typeof window === undefined) {
      return
    }
    _Utils_.addEvent(window, 'beforeunload', this.saveBeforeClosing)
    this.saved = false
  }

  removeBeforunload() {
    if (typeof window === undefined) {
      return
    }
    _Utils_.removeEvent(window, 'beforeunload', this.saveBeforeClosing)
    this.saved = true
    // this.startTime = '';
  }

  saveBeforeClosing = e => {
    // todo this._save(); 问题 -> 不管点取消 确认都会执行 ->没给用户选择的机会 问题
    this._save && setTimeout(this._save, 100) // 关闭选择取消时保存
    return ((e || window.event).returnValue = this.opts.saveMessage) // Gecko + IE
  }
  /**
   * 组件销毁 点击路由切换时调用
   * 直接调用保存
   *  */
  exit() {
    if (this.saved) {
      // 未绑定 beforeunload 数据没发生变化
      return
    }
    this._save && this._save()
  }
}

export default function autoSaveWrap(props) {
  return new AutoSave(props)
}

// // todo
// /**
//  *
//  * 1. debounce 提供的方法 暴露
//  * 2. 直接保存的方法
//  * 3. mobx autoSave
//  * 问题: 待定？
//  * [X] debounce触发时在获取的数据 不一定是本次的数据
//  */
