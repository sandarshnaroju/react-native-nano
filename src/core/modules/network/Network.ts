const {default: axios} = require('axios');
const {executeAFunction, isFunction} = require('../../utils/Utilities');
interface NetworkObjProps {
  [key: string]: any;
}

interface FunctionProps {
  [key: string]: any;
}
const checkNetworkPropsObjectAndRunFunctionsAndSetThoseValuesIfExists = ({
  networkObjProps,
  functionProps,
}: {
  networkObjProps: NetworkObjProps;
  functionProps: FunctionProps;
}) => {
  const newObj: NetworkObjProps = {};

  if (networkObjProps != null && typeof networkObjProps == 'object') {
    Object.keys(networkObjProps).forEach(eachKey => {
      if (
        networkObjProps[eachKey] != null &&
        isFunction(networkObjProps[eachKey])
      ) {
        const res = executeAFunction(networkObjProps[eachKey], functionProps);
        newObj[eachKey] = res;
      } else {
        newObj[eachKey] = networkObjProps[eachKey];
      }
    });
    return newObj;
  } else {
    return networkObjProps;
  }
};
interface RequestObj {
  props: any;
  onSuccess: Function;
  onFailure: Function;
}

interface Props {
  [key: string]: any;
}

export const requestDataFromUrlAsPerNetworkData = ({
  requestType,
  requestObj,
  props,
}: {
  requestType: 'fetch' | 'axios';
  requestObj: RequestObj;
  props: Props;
}): void => {
  switch (requestType) {
    case 'fetch':
      const actualNetworkObj =
        checkNetworkPropsObjectAndRunFunctionsAndSetThoseValuesIfExists({
          networkObjProps: requestObj['props'],
          functionProps: props,
        });
      fetch(actualNetworkObj['url'], actualNetworkObj)
        .then(response => response.json())
        .then(response => {
          executeAFunction(requestObj['onSuccess'], {
            methodValues: response,
            ...props,
          });
        })

        .catch(error => {
          console.log('Error:', error);
          executeAFunction(requestObj['onFailure'], {
            methodValues: error,
            ...props,
          });
        });
      break;
    case 'axios':
      const axiosActualNetworkObj =
        checkNetworkPropsObjectAndRunFunctionsAndSetThoseValuesIfExists({
          networkObjProps: requestObj['props'],
          functionProps: props,
        });

      axios(axiosActualNetworkObj)
        .then(response => {
          executeAFunction(requestObj['onSuccess'], {
            methodValues: response,
            ...props,
          });
        })
        .catch(error => {
          console.log('Error:', error);
          executeAFunction(requestObj['onFailure'], {
            methodValues: error,
            ...props,
          });
        });
      break;

    default:
      break;
  }
};
