var sessionObj = {};
class Session {
  constructor() {}
  setValue(key, value) {
    sessionObj[key] = value;
  }
  getValue(key) {
    return sessionObj[key];
  }
  getAllValues() {
    return sessionObj;
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
