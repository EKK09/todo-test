import useUserStore from '../user';

describe('user store', () => {
  it('initial state', () => {
    const { id, name } = useUserStore.getState();

    expect(id).toBe(null);
    expect(name).toBe('');
  });

  describe('interact state', () => {
    useUserStore.setState({
      name: '',
      id: null,
    });
    const INITIAL_STATE = useUserStore.getState();

    beforeEach(() => {
      useUserStore.setState(INITIAL_STATE, true);
    });

    it('set id', () => {
      const fooId = 1234;
      const { setId } = useUserStore.getState();
      setId(fooId);
      const { id } = useUserStore.getState();

      expect(id).toBe(fooId);
    });

    it('set name', () => {
      const fooName = 'fooName';
      const { setName } = useUserStore.getState();
      setName(fooName);
      const { name } = useUserStore.getState();

      expect(name).toBe(fooName);
    });
  });
});
