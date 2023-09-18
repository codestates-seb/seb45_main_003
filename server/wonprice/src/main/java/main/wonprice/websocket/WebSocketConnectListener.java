package main.wonprice.websocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.ChatSession;
import main.wonprice.domain.chat.service.ChatService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketConnectListener {

    private final ChatService chatService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        GenericMessage generic = (GenericMessage) accessor.getHeader("simpConnectMessage");
        Map nativeHeaders = (Map) generic.getHeaders().get("nativeHeaders");

        if ((nativeHeaders.containsKey("chatRoomId")) && (nativeHeaders.containsKey("memberId"))) {
            Long chatRoomId = Long.parseLong((String) ((List) nativeHeaders.get("chatRoomId")).get(0));
            Long memberId = Long.parseLong((String) ((List) nativeHeaders.get("memberId")).get(0));
            String sessionId = accessor.getSessionId();
            chatService.insertChatSession(chatRoomId, memberId, sessionId);

        }


//        log.info("chatRoomId : " + chatRoomId);
//        log.info("memberId : " + memberId);

    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();
//        log.info("disconnectSessionId : " + accessor.getSessionId());
        ChatSession chatSessionBySessionId = chatService.findChatSessionBySessionId(sessionId);

        if (chatSessionBySessionId != null) {
            chatService.deleteChatSession(sessionId);
        }
    }
}
