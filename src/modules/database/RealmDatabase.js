import Realm from 'realm';
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
    this.realmInstalnce = await Realm.open(configObject);
  }

  constructor(props) {
    let realmConfigObj = {
      schema: [nanoSchema],
      schemaVersion: 1,
    };
    if (props != null && props.schema != null && props.schemaVersion != null) {
      realmConfigObj = {
        schema: [nanoSchema, ...props.schema],
        schemaVersion: props.schemaVersion,
      };
    }

    this.init(realmConfigObj);
  }
  setData(table, data) {
    if (this.realmInstalnce != null) {
      this.realmInstalnce.write(() => {
        this.realmInstalnce.create(table, data);
      });
      return true;
    } else {
      return false;
    }
  }
  getDataByPrimaryKey(table, key) {
    if (this.realmInstalnce != null) {
      return this.realmInstalnce.objectForPrimaryKey(table, key);
    } else {
      return null;
    }
  }
  setNanoConfig(key, value) {
    if (this.realmInstalnce != null) {
      const isDataAlreadyExists = this.realmInstalnce.objectForPrimaryKey(
        TABLE_NANO_SETUP,
        key,
      );
      if (isDataAlreadyExists != null) {
        this.realmInstalnce.write(() => {
          isDataAlreadyExists[key] = value;
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
    return this.realmInstalnce.objectForPrimaryKey(TABLE_NANO_SETUP, key);
  }
  setDataInDatabase(table, dataObj, primaryKey) {
    this.realmInstalnce.write(() => {
      const tableObj = this.realmInstalnce
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
const getDatabase = configObject => {
  if (database == null) {
    database = new Database(configObject);
  }
  return database;
};
export default getDatabase;
