let sessionObj: {[key: string]: any} = {};

class Session {
  constructor() {}

  setValue(key: string, value: any): void {
    sessionObj[key] = value;
  }

  getValue(key: string): any {
    return sessionObj[key];
  }

  deleteValue(key: string): void {
    delete sessionObj[key];
  }

  getAllValues(): {[key: string]: any} {
    return sessionObj;
  }

  deleteAllValues(): void {
    sessionObj = {};
  }
}

let sess: Session | null = null;

const getSession = (): Session => {
  if (sess == null) {
    sess = new Session();
  }
  return sess;
};

export default getSession;
