// Define your data model
const tables = {
  users: [
    {id: 1, name: 'John', age: 30},
    {id: 2, name: 'Jane', age: 25},
  ],
  orders: [
    {id: 1, userId: 1, product: 'Product A'},
    {id: 2, userId: 1, product: 'Product B'},
    {id: 3, userId: 2, product: 'Product C'},
  ],
};

// Define your primary key
const PRIMARY_KEY = 'id';

// Create your CRUD operations
export function createRow(tableName, row) {
  const table = getTable(tableName); // table is array
  const primaryKey = getNextPrimaryKey(table);
  row[PRIMARY_KEY] = primaryKey;
  table.push(row);
  saveTable(tableName, table);
  return row;
}

export function readRow(tableName, id) {
  const table = getTable(tableName);
  const row = table.find(row => row[PRIMARY_KEY] === id);
  return row;
}

export function updateRow(tableName, id, updates) {
  const table = getTable(tableName);
  const index = table.findIndex(row => row[PRIMARY_KEY] === id);
  if (index === -1) {
    return null;
  }
  const oldRow = table[index];
  const newRow = {...oldRow, ...updates};
  table[index] = newRow;
  saveTable(tableName, table);
  return newRow;
}

export function deleteRow(tableName, id) {
  const table = getTable(tableName);
  const index = table.findIndex(row => row[PRIMARY_KEY] === id);
  if (index === -1) {
    return null;
  }
  const row = table[index];
  table.splice(index, 1);
  saveTable(tableName, table);
  return row;
}

// Implement indexing
const indexTable = {};

export function indexKey(key, value, primaryKey) {
  if (!indexTable[key]) {
    indexTable[key] = {};
  }
  indexTable[key][value] = primaryKey;
}

export function getPrimaryKeyFromIndex(key, value) {
  if (!indexTable[key]) {
    return null;
  }
  return indexTable[key][value];
}

// Handle transactions
const transactionQueue = [];

export function startTransaction() {
  transactionQueue.push([]);
}

export function commitTransaction() {
  const transaction = transactionQueue.pop();
  transaction.forEach(([tableName, operation, args]) => {
    switch (operation) {
      case 'create':
        createRow(tableName, args[0]);
        break;
      case 'read':
        readRow(tableName, args[0]);
        break;
      case 'update':
        updateRow(tableName, args[0], args[1]);
        break;
      case 'delete':
        deleteRow(tableName, args[0]);
        break;
    }
  });
}

export function rollbackTransaction() {
  transactionQueue.pop();
}

export function queueOperation(operation, tableName, args) {
  const currentTransaction = transactionQueue[transactionQueue.length - 1];
  currentTransaction.push([tableName, operation, args]);
}

// Helper export functions
export function getTable(tableName) {
  const tableJson = window.localStorage.getItem(tableName);
  return JSON.parse(tableJson) || [];
}

export function saveTable(tableName, table) {
  const tableJson = JSON.stringify(table);
  window.localStorage.setItem(tableName, tableJson);
}

export function getNextPrimaryKey(table) {
  const maxId = Math.max(...table.map(row => row[PRIMARY_KEY]));
  return maxId >= 0 ? maxId + 1 : 0;
}

// Example usage
startTransaction();
