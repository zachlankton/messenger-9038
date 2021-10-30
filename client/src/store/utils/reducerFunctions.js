export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      latestMessageText: message.text
    };
    newConvo.unreadCount = _countUnread(newConvo)
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo }
      convoCopy.messages.push(message)
      convoCopy.unreadCount = _countUnread(convoCopy)
      convoCopy.latestMessageText = message.text
      return convoCopy
    } else {
      return convo;
    }
  }).sort( (a,b) => getLastMessageDate(b) - getLastMessageDate(a) );

  function getLastMessageDate(convo){
    if (convo.messages.length === 0) return 0
    return new Date(convo.messages.at(-1).createdAt)
  }
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      convoCopy.id = message.conversationId;
      convoCopy.messages.push(message)
      convoCopy.unreadCount = _countUnread(convoCopy)
      convoCopy.latestMessageText = message.text;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const markMessagesRead = (state, {convoId, otherUserId} ) => {
  return state.map((convo) => {
    if (convo.id === convoId) {
      const convoCopy = { ...convo };
      convoCopy.messages = convoCopy.messages.map((msg)=>{
        msg = { ...msg }
        if (msg.senderId === otherUserId && msg.messageRead === false) {
          msg.messageRead = true;
        }
        return msg
      })
      convoCopy.unreadCount = _countUnread(convoCopy)
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const countUnread = (conversations) => {
  return conversations.map( (convo) => {
    convo.unreadCount = _countUnread(convo)
    return convo
  } )
}

const _countUnread = (convo) => convo.messages.reduce((count, msg) => {
  if (!msg.messageRead && msg.senderId === convo.otherUser.id) {
    return count += 1
  } else {
    return count
  }
}, 0)
