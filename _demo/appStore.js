import {observable, action, reaction} from 'mobx'
import autoSave from 'debounce-save'
import axios from 'axios'
import moment from 'moment'

export default class Store {
    static key = 'app'
    constructor() {
      // 1. 调用autosave
      /**
       * 注意: 注意 this.postSave 要在autoSave
       *      最好用箭头函数定义
       */
      this.autoSave = autoSave({
        wait: 2000,
        onSave: this.postSave,
        onBeforeSave: this.beforeSave,
        leading: true,
        trailing: false,
        // maxWait: 200
      });

      // 观测数据的改变
      reaction(
        ()=> {
          return [Object.keys(this.saveData).map(key => this.saveData[key])]
        },
        ()=> {
          this.autoSave.debouncedSave()
        }
      )
    }



    @observable showReanme = false;
    @observable saveInfo = 'log'
    @observable beforeFlag = true;
    @observable saveData = {
        textVal: '1'
    }

    // ajax
    beforeSave = () => {
        return this.beforeFlag
      }
    
      
      postSave = async () => {
        const {status, data} = await axios.post('/save', {
          data: {
            // data: this.local.saveData.textVal
          }
        });
        status === 200 && (
          this.saveInfo = this.saveInfo + `<p>${moment().format('YYYY-MM-DD HH:mm:ss')} 自动保存成功</p>`
        )
      }

    @action
    setTextVal(val) {
        this.saveData.textVal = val
    }

    @action
    upData  = (data = {}) => {
        Object.assign(this, data)
    }

    @action
    setProps  = (that, data = {}) => {
        Object.assign(that, data)
    }
  
}