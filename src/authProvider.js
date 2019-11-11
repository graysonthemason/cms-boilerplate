import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK
} from 'react-admin';

import LoginMutation from './mutations/Login';
import CurrentUserQuery from './queries/CurrentUser'


export default (client2) => {
  return (type, params) => {
    // called when the user attempts to log in
    const client = client2
    if (type === AUTH_LOGIN) {
      const {
        username,
        password
      } = params;
      return client.mutate({
          mutation: LoginMutation,
          variables: {
            email: username,
            password
          }
        })
        .then(data => {
          if (data.status < 200 || data.status >= 300) {
            throw new Error(data);
          }
          localStorage.setItem('username', username);
          Promise.resolve();
          return data;
        }).catch(error => {
          return Promise.reject(error.message);
        })
      return Promise.resolve();
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
      localStorage.removeItem('username');
      return Promise.resolve();
    }
    // called when the API returns an error
    if (type === AUTH_ERROR) {
      const {
        status
      } = params;
      if (status === 401 || status === 403) {
        localStorage.removeItem('username');
        return Promise.reject();
      }
      return Promise.resolve();
    }
    // called when the user navigates to a new location
    // Here is where we'll set resource auth
    if (type === AUTH_CHECK) {
      return localStorage.getItem('username') || null
      // return client.query({
      //     query: CurrentUserQuery
      //   })
      //   .then(data => {
      // 		// TODO: this always authenticates and requires an SSO solution
      //     if (data.me) {
      //       Promise.resolve()
      //     } else {
      //       Promise.reject("Not Logged In")
      //     }
      //   })
    }
    return Promise.reject('Unknown method');
  }
};
