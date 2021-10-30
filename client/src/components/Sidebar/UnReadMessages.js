import React from "react";
import { Box, Badge } from "@material-ui/core";

const UnReadMessages = (props) => {

  return (
    <Box>
      <Badge
        badgeContent={props.unreadCount}
        color="primary"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      />
    </Box>
  );
};

export default UnReadMessages;
