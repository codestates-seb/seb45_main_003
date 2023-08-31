package main.wonprice.domain.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import main.wonprice.domain.chat.entity.Message;
import main.wonprice.domain.chat.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;

    @Transactional
    public Long saveMessage(Message message) {
        Message saveMessage = messageRepository.save(message);

        return saveMessage.getMessageId();
    }
}
