const {default: axios} = require('axios');
const {executeAFunction} = require('../../utils/Utilities');

export const requestDataFromUrlAsPerNetworkData = ({
  requestType,
  requestObj,
  props,
}) => {
  switch (requestType) {
    case 'fetch':
      fetch(requestObj['fetch']['url'], requestObj['fetch'])
        .then(response => response.json())
        .then(response => {
          executeAFunction(requestObj['onSuccess'], {response, ...props});
        })
        .catch(error => {
          console.log('Error:', error);
          executeAFunction(requestObj['onFailure'], {error, ...props});
        });
      break;
    case 'axios':
      axios(requestObj['axios'])
        .then(response => {
          executeAFunction(requestObj['onSuccess'], {response, ...props});
        })
        .catch(error => {
          console.log('Error:', error);
          executeAFunction(requestObj['onFailure'], {error, ...props});
        });
      break;

    default:
      break;
  }
};
