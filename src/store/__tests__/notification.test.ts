import useNotificationStore, { NotificationStatus } from '../notification';

describe('notification store', () => {
  it('initial state', () => {
    const { message, status, isShow } = useNotificationStore.getState();

    expect(message).toBe('');
    expect(status).toBe(NotificationStatus.SUCCESS);
    expect(isShow).toBeFalsy();
  });

  describe('interact state', () => {
    useNotificationStore.setState({
      message: '',
      status: NotificationStatus.SUCCESS,
      isShow: false,
    });
    const INITIAL_STATE = useNotificationStore.getState();

    beforeEach(() => {
      useNotificationStore.setState(INITIAL_STATE, true);
    });

    it('show notification', () => {
      const fooMessage = 'fooMessage';
      const fooStatus = NotificationStatus.FAIL;
      useNotificationStore.setState({ isShow: false });
      const { showNotification, isShow: isShowBefore } = useNotificationStore.getState();

      expect(isShowBefore).toBeFalsy();

      showNotification(fooMessage, fooStatus);
      const { message, status, isShow } = useNotificationStore.getState();

      expect(message).toBe(fooMessage);
      expect(status).toBe(fooStatus);
      expect(isShow).toBeTruthy();
    });

    it('hide notification', () => {
      useNotificationStore.setState({ isShow: true });
      const { hideNotification, isShow: isShowBefore } = useNotificationStore.getState();

      expect(isShowBefore).toBeTruthy();

      hideNotification();
      const { isShow } = useNotificationStore.getState();

      expect(isShow).toBeFalsy();
    });
  });
});
