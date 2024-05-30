import {EventRegister} from 'react-native-event-listeners';
import Base64 from '../../utils/Base64';
import {DATABASE_CONSTANTS} from '../../utils/Utilities';
import getDatabase from '../database/RealmDatabase';

interface ScreenData {
  signature: string;
  json: string;
}

interface ExistingScreenCodeObj {
  value: string;
}
export const fetchScreenFromDb = async ({
  screenUrl,
  databaseName,
}: {
  screenUrl: string;
  databaseName: string;
}): Promise<any> => {
  const Realm = getDatabase(null, databaseName, null);

  if (screenUrl) {
    const existingScreenCodeObj: ExistingScreenCodeObj | null =
      Realm.getValue(screenUrl);

    if (
      existingScreenCodeObj != null &&
      existingScreenCodeObj['value'] != null
    ) {
      const parsed: ScreenData = JSON.parse(existingScreenCodeObj['value']);
      if (parsed['signature'] != null && parsed['json'] != null) {
        const decoded: string = Base64.atob(parsed['json']);

        if (decoded) {
          const parsedCode = JSON.parse(decoded);
          if (parsedCode) {
            return Promise.resolve(parsedCode);
          }
        }
      }
    }

    EventRegister.emit('load-screen-code-from-url', screenUrl);
  }
  return Promise.reject(null);
};

export const fetchAllScreensFromDB = async (databaseName: string) => {
  const Realm = getDatabase(null, databaseName, null);

  const allScreensObj = Realm.getValue(
    DATABASE_CONSTANTS.NAME_AND_SCREEN_URL_OBJECT,
  );

  try {
    if (allScreensObj && allScreensObj['value']) {
      const parsed = JSON.parse(allScreensObj['value']);

      return Promise.resolve(parsed);
    }
  } catch (error) {
    return Promise.resolve(null);
  }
};
