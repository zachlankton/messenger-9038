import React, { useRef, useEffect } from "react";
import { Box } from "@material-ui/core";

export function useChatAutoScroll (conversation) {

    const bottomOfPageRef = useRef(null)

    const scrollToBottom = () => {
        bottomOfPageRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    
    useEffect(() => {
        scrollToBottom()
    }, [conversation]);

    return bottomOfPageRef
}

export function BottomOfPage (props) {
    return <Box ref={props.innerRef} />
}