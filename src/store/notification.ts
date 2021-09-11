import create from 'zustand';

export enum NotificationStatus {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

interface NotificationStore {
  message: string;
  status: NotificationStatus;
  isShow: boolean;
  showNotification: (message: string, status?:NotificationStatus) => void;
  hideNotification:() => void;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  message: '',
  status: NotificationStatus.SUCCESS,
  isShow: false,

  showNotification: (message, status = NotificationStatus.SUCCESS) => {
    set({ isShow: true, message, status });
  },

  hideNotification: () => {
    set({ isShow: false });
  },
}));

export default useNotificationStore;
