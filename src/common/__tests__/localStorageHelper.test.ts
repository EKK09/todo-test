import { getToken, setToken, removeToken } from '../localStorageHelper';

describe('localStorageHelper', () => {
  const token = 'token';
  it('get token', () => {
    getToken();
    expect(localStorage.getItem).toBeCalledWith(token);
  });
  it('set token', () => {
    const fooToken = 'fooToken';
    setToken(fooToken);
    expect(localStorage.setItem).toBeCalledWith(token, fooToken);
  });
  it('remove token', () => {
    removeToken();
    expect(localStorage.removeItem).toBeCalledWith(token);
  });
});
