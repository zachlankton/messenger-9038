import React from "react";
import { Box, Badge } from "@material-ui/core";

const UnReadMessages = (props) => {

  return (
    <Box>
      <Badge
        badgeContent={props.count}
        color="primary"
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
      </Badge>
    </Box>
  );
};

export default UnReadMessages;
