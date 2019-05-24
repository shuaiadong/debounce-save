import React, {Component} from 'react';
import {render} from 'react-dom';
const h = React.createElement;
import {HashRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routers from './routers';

import RootStore from './rootStore.js';
import {Provider} from 'mobx-react';

render(
    h(Provider, { ...new RootStore()},

        h(HashRouter, {},
            renderRoutes(routers)
        ),
    ),
    document.getElementById('root')
);