import { AppRegistry } from 'react-native';
import App from './App';
import './global.css';
import { name as appName } from './app.json';

import 'react-native-get-random-values';
import PouchDB from 'pouchdb';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import SQLite from 'react-native-sqlite-2';
import { DatabaseManager, p } from "pocketto";

// setup for the SQL Lite Adapter for PouchDB
const SQLiteAdapter = SQLiteAdapterFactory(SQLite);
PouchDB.plugin(SQLiteAdapter);

// polyfill for base64 encoding/decoding
if (typeof btoa === 'undefined') global.btoa = base64.encode;
if (typeof atob === 'undefined') global.atob = base64.decode;

p.setEnvironment("react-native");
p.setIdMethod('timestamp');
DatabaseManager.connect('default', {
    adapter: 'react-native-sqlite',
    dbName: 'default'
}).then((localDb) => {
    const remoteHost = Platform.OS === 'android' ? 'http://192.168.68.107:5984' : 'http://localhost:5984';
    DatabaseManager.connect(`${remoteHost}/test`, {
        dbName: 'remote',
        auth: {
            username: 'admin',
            password: 'qwer1234',
        },
    }).then((remoteDb) => {
        localDb.sync(remoteDb, {
            live: true,
            retry: true,
        });
        p.setRealtime(true);
    });
});
AppRegistry.registerComponent(appName, () => App);
