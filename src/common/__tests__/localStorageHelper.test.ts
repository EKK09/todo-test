import { getToken, setToken, removeToken } from '../localStorageHelper';

describe('localStorageHelper', () => {
  const token = 'token';
  it('get token', () => {
    const spy = jest.spyOn(window.localStorage, 'getItem');
    getToken();
    expect(spy).toBeCalledWith(token);
  });
  it('set token', () => {
    const fooToken = 'fooToken';
    const spy = jest.spyOn(window.localStorage, 'setItem');
    setToken(fooToken);
    expect(spy).toBeCalledWith(token, fooToken);
  });
  it('remove token', () => {
    const spy = jest.spyOn(window.localStorage, 'removeItem');
    removeToken();
    expect(spy).toBeCalledWith(token);
  });
});
