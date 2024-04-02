import {DataBaseConfig} from '../../../../../../nano.config';
const nanoSchema = {
  name: TABLE_KEY_VALUE,
  properties: {
    key: 'string',
    value: 'string',
  },
  primaryKey: 'key',
};
const TABLE_KEY_VALUE = 'key-value';
let localStorage = window.localStorage;

class Database {
  constructor(props) {
    this.config = props.schema;
    this.init();
    // props.initCallBack(true);
    if (DataBaseConfig && DataBaseConfig.schema) {
      DataBaseConfig.schema.forEach(eachSchema => {
        localStorage.setItem(
          'metadata' + eachSchema.name,
          eachSchema.primaryKey,
        );
      });
    }
  }

  init() {
    // No need to initialize anything for localStorage
  }

  setData(table, data) {
    const existing = localStorage.getItem(table);
    if (existing != null) {
      const parsedExisting = JSON.parse(existing);
      if (
        parsedExisting != null &&
        parsedExisting.length > 0 &&
        Array.isArray(parsedExisting)
      ) {
        const primaryKey = localStorage.getItem('metadata' + table);
        const alreadyExistingIndex = parsedExisting.findIndex(
          o => o[primaryKey] == data[primaryKey],
        );
        if (alreadyExistingIndex > -1) {
          parsedExisting.splice(alreadyExistingIndex, 1);
        }
        const updated = [...parsedExisting, data];
        localStorage.setItem(table, JSON.stringify(updated));
      }
    } else {
      localStorage.setItem(table, JSON.stringify([data]));
    }
  }

  getDataByPrimaryKey(table, key) {
    const data = localStorage.getItem(table);
    if (data) {
      const parsedData = JSON.parse(data);
      const primaryKey = localStorage.getItem('metadata' + table);
      const required = parsedData.find(o => o[primaryKey] == key);
      return required || null;
    }
    return null;
  }

  getData(table) {
    const data = localStorage.getItem(table);
    return data ? JSON.parse(data) : null;
  }

  updateData(table, primaryKeyName, primaryKeyValue, dataObj) {
    const data = localStorage.getItem(table);
    if (data) {
      const parsedData = JSON.parse(data);
      const requiredIndex = parsedData.findIndex(
        o => o[primaryKeyName] == primaryKeyValue,
      );
      if (requiredIndex > -1) {
        parsedData.splice(requiredIndex, 1);
      }
      const updated = [...parsedData, dataObj];
      localStorage.setItem(table, JSON.stringify(updated));
    }
  }

  deleteData(table, primaryKeyName, primaryKeyValue) {
    const data = localStorage.getItem(table);
    if (data) {
      const parsedData = JSON.parse(data);
      const requiredIndex = parsedData.findIndex(
        o => o[primaryKeyName] == primaryKeyValue,
      );
      if (requiredIndex > -1) {
        parsedData.splice(requiredIndex, 1);
      }
      localStorage.setItem(table, JSON.stringify(parsedData));
    }
  }

  deleteAllData(table) {
    localStorage.removeItem(table);
  }

  setValue(key, value) {
    const data = localStorage.getItem(TABLE_KEY_VALUE);

    const parsedData = data ? JSON.parse(data) : [];
    if (
      parsedData != null &&
      parsedData.length >= 0 &&
      Array.isArray(parsedData)
    ) {
      const requiredIndex = parsedData.findIndex(o => o['key'] == key);
      if (requiredIndex > -1) {
        parsedData[requiredIndex]['value'] = value;
      } else {
        parsedData.push({key, value});
      }
    }
    localStorage.setItem(TABLE_KEY_VALUE, JSON.stringify(parsedData));
  }

  getValue(key) {
    const data = localStorage.getItem(TABLE_KEY_VALUE);

    if (data) {
      const parsedData = JSON.parse(data);

      const required = parsedData.find(o => o.key == key);

      return required || null;
    }
    return null;
  }

  deleteValue(key) {
    const data = localStorage.getItem(TABLE_KEY_VALUE);
    if (data) {
      const parsedData = JSON.parse(data);
      const requiredIndex = parsedData.findIndex(o => o['key'] == key);
      if (requiredIndex > -1) {
        parsedData.splice(requiredIndex, 1);
      }

      localStorage.setItem(TABLE_KEY_VALUE, JSON.stringify(parsedData));
    }
  }

  deleteAllValues() {
    localStorage.removeItem(TABLE_KEY_VALUE);
  }

  deleteAllTables() {
    localStorage.clear();
  }
}

let database = null;

const getDatabase = (callBack, customSchema) => {
  if (database == null) {
    database = new Database({initCallBack: callBack, schema: customSchema});
  }
  return database;
};

export default getDatabase;
