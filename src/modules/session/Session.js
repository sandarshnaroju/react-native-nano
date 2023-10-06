var sessionObj = {};
class Session {
  constructor() {}
  setValue(key, value) {
    sessionObj[key] = value;
  }
  getValue(key) {
    return sessionObj[key];
  }
  deleteValue(key) {
    sessionObj[key] = null;
  }
  getAllValues() {
    return sessionObj;
  }
  deleteAllValues() {
    sessionObj = {};
  }
}
var sess = null;
const getSession = () => {
  if (sess == null) {
    sess = new Session();
  }
  return sess;
};
export default getSession;
