package main.wonprice.websocket;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

        Long chatRoomId = Long.parseLong((String) ((List) nativeHeaders.get("chatRoomId")).get(0));
        Long memberId = Long.parseLong((String) ((List) nativeHeaders.get("memberId")).get(0));
        String sessionId = accessor.getSessionId();

//        log.info("chatRoomId : " + chatRoomId);
//        log.info("memberId : " + memberId);

        chatService.insertChatSession(chatRoomId, memberId, sessionId);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();
//        log.info("disconnectSessionId : " + accessor.getSessionId());

        chatService.deleteChatSession(sessionId);
    }

    @EventListener
    public void handleSubscriptionEventListener(SessionSubscribeEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = accessor.getSessionId();
        String destination = accessor.getDestination();

        // 새로운 구독을 감지하고 원하는 작업을 수행
        System.out.println("새로운 구독 - Session ID: " + sessionId + ", Destination: " + destination);
    }
}
