import Realm from 'realm';
import {DataBaseConfig} from '../../../../../nano.config';
const TABLE_KEY_VALUE = 'key-value';

const nanoSchema = {
  name: TABLE_KEY_VALUE,
  properties: {
    key: 'string',
    value: 'string',
  },
  primaryKey: 'key',
};

class Database {
  async init() {
    if (this.realmInstance == null) {
      this.realmInstance = await Realm.open(this.config);
    }
  }

  constructor(props) {
    this.config = props.realmConfigObj;
    this.init()
      .then(() => {
        props.initCallBack(true);
      })
      .catch(() => {
        props.initCallBack(null);
      });
  }
  async getRealmInstance() {
    if (this.realmInstance != null) {
      return this.realmInstance;
    } else {
      return null;
    }
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
  getData(table) {
    if (this.realmInstance != null) {
      return this.realmInstance.objects(table);
    } else {
      return null;
    }
  }
  updateData(table, primaryKeyName, primaryKeyValue, dataObj) {
    this.realmInstance.write(() => {
      const tableObj = this.realmInstance
        .objects(table)
        .find(data => data[primaryKeyName] == primaryKeyValue);

      Object.keys(dataObj).forEach(eachKey => {
        if (eachKey != primaryKeyName) {
          tableObj[eachKey] = dataObj[eachKey];
        }
      });
    });
  }
  deleteData(table, primaryKeyName, primaryKeyValue) {
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        const allData = this.realmInstance.objects(table);
        const matched = allData.find(
          data => data[primaryKeyName] == primaryKeyValue,
        );
        this.realmInstance.delete(matched);
      });
    }
  }

  deleteAllData(table) {
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        const allData = this.realmInstance.objects(table);

        this.realmInstance.delete(allData);
      });
    }
  }

  setValue(key, value) {
    if (this.realmInstance != null) {
      const allData = this.realmInstance.objects(TABLE_KEY_VALUE);
      const matched = allData.filtered(`key == '${key}'`);

      if (matched != null && matched.length > 0) {
        this.realmInstance.write(() => {
          matched[0]['value'] = value;
        });

        return true;
      } else {
        return this.setData(TABLE_KEY_VALUE, {
          key,
          value,
        });
      }
    }
  }

  getValue(key) {
    if (this.realmInstance != null) {
      const val = this.realmInstance.objectForPrimaryKey(TABLE_KEY_VALUE, key);

      return val;
    }
    return null;
  }
  deleteValue(key) {
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        const allData = this.realmInstance.objects(TABLE_KEY_VALUE);
        const matched = allData.filtered(`key == '${key}'`);
        this.realmInstance.delete(matched);
      });
    }
  }

  deleteAllValues() {
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        const allData = this.realmInstance.objects(TABLE_KEY_VALUE);

        this.realmInstance.delete(allData);
      });
    }
  }

  deleteAllTables() {
    if (this.realmInstance != null) {
      this.realmInstance.write(() => {
        this.realmInstance.deleteAll();
      });
    }
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
      let realmConfigObj = {
        schema: [nanoSchema],
        schemaVersion: 1,
      };

      if (DataBaseConfig != null && DataBaseConfig.schema != null) {
        realmConfigObj = {
          ...DataBaseConfig,
          schema: [nanoSchema, ...DataBaseConfig.schema],
        };
      }

      database = new Database({initCallBack, realmConfigObj});
    }
  } catch (e) {
    database = null;
  }

  return database;
};
export default getDatabase;
