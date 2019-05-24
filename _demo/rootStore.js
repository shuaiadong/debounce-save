import AppStore from './appStore';
export default class RootStore {
    
    constructor() {
        
    }

    app = new AppStore(this)
}