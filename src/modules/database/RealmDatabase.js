// import {DataBaseConfig} from '../../../../../nano.config';
const DataBaseConfig = null;
const TABLE_NANO_SETUP = 'nano-setup';
const nanoSchema = {
  name: TABLE_NANO_SETUP,
  properties: {
    key: 'string',
    value: 'string',
  },
  primaryKey: 'key',
};

class Database {
  async init(configObject) {
    // this.realmInstance = await Realm.open(configObject);
  }

  constructor(props) {
    let realmConfigObj = {
      schema: [nanoSchema],
      schemaVersion: 1,
    };

    if (
      DataBaseConfig != null &&
      DataBaseConfig.schema != null &&
      DataBaseConfig.schemaVersion != null
    ) {
      realmConfigObj = {
        schema: [nanoSchema, ...DataBaseConfig.schema],
        schemaVersion: DataBaseConfig.schemaVersion,
      };
    }

    this.init(realmConfigObj)
      .then(() => {
        props.initCallBack(true);
      })
      .catch(() => {
        console.log('Instance create failed');
        props.initCallBack(null);
      });
  }

  setData(table, data) {
    const reqTableData = window.localStorage.getItem(table);
    const parsedTableData = JSON.parse(reqTableData) || {data: []};
    const dataArray = parsedTableData['data'];
    const primKey = parsedTableData['primaryKey'];

    let reqKeyValuePairIndex = -1;
    if (dataArray && primKey) {
      reqKeyValuePairIndex = dataArray.findIndex(
        obj => obj[primKey] === data[primKey],
      );
    } else {
      return false;
    }
    if (reqKeyValuePairIndex >= 0) {
      dataArray.splice(reqKeyValuePairIndex, 1, data);
    } else {
      dataArray.push(data);
    }
    window.localStorage.setItem(
      TABLE_NANO_SETUP,
      JSON.stringify({
        data: dataArray,
        primaryKey: nanoSchema.primaryKey,
      }),
    );
    return true;
  }
  getDataByPrimaryKey(table, key) {
    // return readRow(table, key);
    const reqTableData = window.localStorage.getItem(table);
    const parsedTableData = JSON.parse(reqTableData) || {data: []};
    const dataArray = parsedTableData['data'];
    const primKey = parsedTableData['primaryKey'];
    let reqKeyValuePairIndex = -1;
    if (dataArray) {
      reqKeyValuePairIndex = dataArray.find(obj => obj[primKey] === key);
      return reqKeyValuePairIndex;
    } else {
      return null;
    }
  }
  setNanoConfig(key, value) {
    const reqTableData = window.localStorage.getItem(TABLE_NANO_SETUP);
    const parsedTableData = JSON.parse(reqTableData) || {data: []};
    const dataArray = parsedTableData['data'];
    let reqKeyValuePairIndex = -1;

    if (dataArray) {
      reqKeyValuePairIndex = dataArray.findIndex(
        obj => Object.keys(obj)[0] === key,
      );
    } else {
      return false;
    }

    const obj = {};
    obj[key] = value;
    if (reqKeyValuePairIndex >= 0) {
      dataArray.splice(reqKeyValuePairIndex, 1, obj);
    } else {
      dataArray.push(obj);
    }
    window.localStorage.setItem(
      TABLE_NANO_SETUP,
      JSON.stringify({
        data: dataArray,
        primaryKey: nanoSchema.primaryKey,
      }),
    );
    return true;
  }

  getNanoConfig(key) {
    const reqTableData = window.localStorage.getItem(TABLE_NANO_SETUP);
    const parsedTableData = JSON.parse(reqTableData) || {data: []};
    const dataArray = parsedTableData['data'];
    let reqKeyValuePairIndex = -1;
    if (dataArray) {
      reqKeyValuePairIndex = dataArray.findIndex(
        obj => Object.keys(obj)[0] === key,
      );
    } else {
      return null;
    }

    if (reqKeyValuePairIndex !== -1) {
      return dataArray[reqKeyValuePairIndex];
    } else {
      return null;
    }
  }
  setDataInDatabase(table, dataObj, primaryKey) {}
}
var database = null;

const getDatabase = callBack => {
  const initCallBack = () => {
    console.log('first call back');

    callBack(database);
  };
  try {
    if (database == null) {
      database = new Database({initCallBack});
    }
  } catch (e) {
    database = null;
  }

  return database;
};
export default getDatabase;
