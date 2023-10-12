const {default: axios} = require('axios');
const {executeAFunction, isFunction} = require('../../utils/Utilities');

const checkNetworkPropsObjectAndRunFunctionsAndSetThoseValuesIfExists = ({
  networkObjProps,
  functionProps,
}) => {
  const newObj = {};

  if (networkObjProps != null && typeof networkObjProps === 'object') {
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

export const requestDataFromUrlAsPerNetworkData = ({
  requestType,
  requestObj,
  props,
}) => {
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
