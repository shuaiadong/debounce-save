import {observable, action} from 'mobx'
import autoSave from 'debounce-save'
import axios from 'axios'


export default class Store {
    static key = 'app'
    constructor() {
        
    }



    @observable showReanme = false;
    @observable saveInfo = '1'

    @observable saveData = {
        textVal: '1'
    }

    // ajax
    beforeSave() {
        return !!this.local.beforeFlag
      }
    
      // 1. 调用autosave
      autoSave = autoSave({
        wait: 200,
        onSave: this.postSave,
        onBeforeSave: this.beforeSave
      })
    
      
      postSave = async () => {
          debugger
        const {status, data} = await axios.post('/save', {
          data: {
            // data: this.local.saveData.textVal
          }
        });
        console.log('保存成功')
      }

    @action
    setTextVal(val) {
        this.saveData.textVal = val
    }

    @action
    upData  = (data = {}) => {
        Object.assign(this, data)
        // this.showReanme = !this.showReanme
    }
}