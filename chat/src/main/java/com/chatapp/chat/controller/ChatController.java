package com.chatapp.chat.controller;

import com.chatapp.chat.dto.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/message")
    @SendToUser
    public void send(SimpMessageHeaderAccessor sha,@Payload MessageDTO messageDTO) {
      simpMessagingTemplate.convertAndSendToUser(messageDTO.getTo(), "/queue/messages", messageDTO.getMessage());
    }
}