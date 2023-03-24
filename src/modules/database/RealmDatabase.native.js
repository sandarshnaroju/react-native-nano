import Realm from 'realm';
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
    this.realmInstance = await Realm.open(configObject);
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
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        this.realmInstance.create(table, data);
      });
      return true;
    } else {
      return false;
    }
  }
  getDataByPrimaryKey(table, key) {
    if (this.realmInstance != null) {
      return this.realmInstance.objectForPrimaryKey(table, key);
    } else {
      return null;
    }
  }
  setNanoConfig(key, value) {
    if (this.realmInstance != null) {
      const allData = this.realmInstance.objects(TABLE_NANO_SETUP);
      const matched = allData.filtered(`key == '${key}'`);

      if (matched != null && matched.length > 0) {
        this.realmInstance.write(() => {
          matched[0]['value'] = value;
        });

        return true;
      } else {
        return this.setData(TABLE_NANO_SETUP, {
          key,
          value,
        });
      }
    }
  }

  getNanoConfig(key) {
    const val = this.realmInstance.objectForPrimaryKey(TABLE_NANO_SETUP, key);
    // console.log('getConfig', key, val);

    return val;
  }
  setDataInDatabase(table, dataObj, primaryKey) {
    this.realmInstance.write(() => {
      const tableObj = this.realmInstance
        .objects(table)
        .filtered(`${primaryKey} = '${dataObj[primaryKey]}'`);

      Object.keys(dataObj).forEach(eachKey => {
        if (eachKey != primaryKey) {
          tableObj[eachKey] = dataObj[eachKey];
        }
      });
    });
  }
}
var database = null;

const getDatabase = callBack => {
  const initCallBack = () => {
    callBack(database);
  };
  try {
    if (database == null) {
      require('realm');

      database = new Database({initCallBack});
    }
  } catch (e) {
    database = null;
  }

  return database;
};
export default getDatabase;
