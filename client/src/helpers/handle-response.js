import { authenticationService } from '../services/export';

export function handleResponse(response) {
  console.log('res in handle: ' + JSON.stringify(response));
  if (response.statusText !== 'OK') {
    if (response.status === 401 || response.status === 403) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      authenticationService.logout();
      this.props.history.push('/login');
    }

    const error = (response && response.data) || response.statusText;
    return Promise.reject(error);
  }

  console.log("returning response");
  return response;
}