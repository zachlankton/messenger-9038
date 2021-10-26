import React from "react";
import { Box, Badge } from "@material-ui/core";

const countUnread = (conversation) => conversation.messages.reduce((count, msg) => {
  if (!msg.messageRead && msg.senderId === conversation.otherUser.id) {
    return count += 1
  } else {
    return count
  }
}, 0)

export { countUnread }

const UnReadMessages = (props) => {

  const unreadCount = countUnread(props.conversation)

  return (
    <Box>
      <Badge
        badgeContent={unreadCount}
        color="primary"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      </Badge>
    </Box>
  );
};

export default UnReadMessages;
