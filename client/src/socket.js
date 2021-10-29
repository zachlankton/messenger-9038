import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessagesRead
} from "./store/conversations";
import { markMessagesRead } from "./store/utils/thunkCreators";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const {conversationId, senderId} = data.message
    const { activeConversation } = store.getState()

    store.dispatch(setNewMessage(data.message, data.sender));

    if (activeConversation === senderId) {
      store.dispatch(markMessagesRead(conversationId, senderId));
    }
  });

  socket.on("messages-read", (data) => {
    store.dispatch(setMessagesRead(data.convoId, data.otherUserId));
  });
  
});

export default socket;
