import { create } from "zustand";

const useStore = create((set) => ({
  selected: null,
  setSelected: (selected) => set({ selected }),

  searchedMsg: [],
  setSearchedMsg: (searchedMsg) => set({ searchedMsg }),

  chat: [],
  setChat: (chat) => set({ chat }),
  addNewMsg: (newMessage) =>
    set((state) => ({
      chat: [...state.chat, newMessage],
    })),

  isSelected: [],
  setIsSelected: (isSelected) => set({ isSelected }),

  allChat: [],
  setAllChat: (allChat) => set({ allChat }),

  // freshMsg: [],
  // setfreshMsg: (freshMsg) => set({ freshMsg }),

  formateDate: [],
  setFormatDate: (formateDate) => set({ formateDate }),

  moveChat: 0,
  // setMoveChat: (state) => set({ count: state.count + 1 }),
  setMoveChat: (moveChat) => set({ moveChat }),

  searchText: null,
  setSearchText: (searchText) => set({ searchText }),

  allUser: [],
  setAllUser: (allUser) => set({ allUser }),
  setAllLast_MsgDay: (lastMsgDays) =>
    set((state) => ({
      allUser: state.allUser.map((user) => {
        const matchingMsgDay = lastMsgDays.find(
          (day) => day._id === user._id // Check if user._id matches any _id in lastMsgDays
        );
        console.log("Matching messageDay:", matchingMsgDay); // Debug log for each match
        return matchingMsgDay
          ? { ...user, messageDay: matchingMsgDay.createdAt }
          : user;
      }),
    })),

  // senderOpened: null,
  // setSenderOpened: (senderOpened) => set({ senderOpened }),

  // unseenCount, setUnseenCount
  unseenCount: [],
  setUnseenCount: (unseenCount) => set({ unseenCount }),
  // setUnseenCount: (senderId, unreadCount, createdAt) =>
  //   set((state) => ({
  //     unseenCount: {
  //       ...state.unseenCount,
  //       [senderId]: {
  //         unreadCount: unreadCount,
  //         createdAt: createdAt,
  //       },
  //     },
  //   })),
}));
export default useStore;
