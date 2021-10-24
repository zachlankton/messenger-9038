import React, {useEffect} from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setMessagesRead } from "../../store/utils/thunkCreators";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import UnReadMessages from "./UnReadMessages"

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation, activeChat } = props;
  const { otherUser } = conversation;

  const unreadCount = conversation.messages.reduce((count, msg)=>{
    if (!msg.messageRead && msg.senderId === otherUser.id) {
      return count += 1
    } else {
      return count
    }
  },0)

  const onFocus = (ev) => {
    if (activeChat.id === conversation.id && unreadCount > 0){
      props.setMessagesRead(conversation.id, otherUser.id)
    }
  }

  useEffect(() => {
    window.addEventListener("focus", onFocus)
    return () => { window.removeEventListener("focus", onFocus)}
  });

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation);
    if (unreadCount > 0) {
      await props.setMessagesRead(conversation.id, otherUser.id)
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      <UnReadMessages count={unreadCount} />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (conversation) => {
      dispatch(setActiveChat(conversation));
    },
    setMessagesRead: (convoId, otherUserId) => {
      dispatch(setMessagesRead(convoId, otherUserId))
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activeChat: state.activeConversation,
    conversations: state.conversations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
