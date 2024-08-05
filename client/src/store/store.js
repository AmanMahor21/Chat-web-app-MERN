import { create } from "zustand";

const useStore = create((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),

  searchedMsg: [],
  setSearchedMsg: (searchedMsg) => set({ searchedMsg }),

  chat: [],
  setChat: (chat) => set({ chat }),

  moveChat: 0,
  // setMoveChat: (state) => set({ count: state.count + 1 }),
  setMoveChat: (moveChat) => set({ moveChat }),

  searchText: null,
  setSearchText: (searchText) => set({ searchText }),

  allUser: [],
  setAllUser: (allUser) => set({ allUser }),
}));
export default useStore;
