const getStorage = (rememberMe) => (rememberMe ? localStorage : sessionStorage);

const localStorageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  const rememberMe = store.getState().user.rememberMe;

  if (action.type === 'user/login/fulfilled') {
    const token = store.getState().user.token;
    const expiresIn = 24 * 60 * 60 * 1000; 
    const expirationTime = new Date(new Date().getTime() + expiresIn);

    if (token) {
      getStorage(rememberMe).setItem('token', token);
      getStorage(rememberMe).setItem('tokenExpiration', expirationTime);
    }
  } else if (action.type === 'user/logout' || action.type === 'user/tokenExpired') {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('tokenExpiration');
  }

  //Each time the user dispatches an action, we check if the token has expired.
  //If it has, we dispatch the user/tokenExpired action.
  const tokenExpiration = getStorage(rememberMe).getItem('tokenExpiration');
  if (tokenExpiration && new Date(tokenExpiration).getTime() < new Date().getTime()) {
    store.dispatch({ type: 'user/tokenExpired' });
  }

  return result;//Go to the next middleware or reducer.
};

export default localStorageMiddleware;
