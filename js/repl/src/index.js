import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Repl from './Repl';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Repl />, document.getElementById('root'));
registerServiceWorker();
