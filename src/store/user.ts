import create from 'zustand';

interface UserStore {
  name: string;
  id: number | null;
  setName: (name: string) => void;
  setId: (id: number) => void;
}

const useUserStore = create<UserStore>((set) => ({
  id: null,
  name: '',

  setName: (name: string) => {
    set({ name });
  },

  setId: (id: number) => {
    set({ id });
  },
}));

export default useUserStore;
