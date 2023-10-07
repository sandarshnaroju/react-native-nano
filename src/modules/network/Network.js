const {default: axios} = require('axios');
const {executeAFunction} = require('../../utils/Utilities');

export const requestDataFromUrlAsPerNetworkData = ({
  requestType,
  requestObj,
  props,
}) => {
  switch (requestType) {
    case 'fetch':
      fetch(requestObj['props']['url'], requestObj['props'])
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
      axios(requestObj['props'])
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
