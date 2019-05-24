import React, {Component} from 'react';
import {observer} from 'mobx-react';
import axios from 'axios'

@observer
export default class App extends Component {
    
    componentDidMount() {
        axios.post('/save') // 请求的mock
    }

    render () {
        return <div >
        <p >
        111
                </p>
        </div>
    }
}