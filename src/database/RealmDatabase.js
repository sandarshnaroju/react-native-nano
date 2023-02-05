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
  async init() {
    this.realmInstalnce = await Realm.open({
      schema: [nanoSchema],
      schemaVersion: 2,
    });
  }

  constructor() {
    this.init();
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
}
var database = null;
export const getDatabase = () => {
  if (database == null) {
    database = new Database();
  }
  return database;
};
