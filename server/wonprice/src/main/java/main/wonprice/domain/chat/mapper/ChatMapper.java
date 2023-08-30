package main.wonprice.domain.chat.mapper;

import main.wonprice.domain.chat.controller.dto.ChatPostRequest;
import main.wonprice.domain.chat.entity.ChatRoom;
import main.wonprice.domain.member.dto.MemberPostDto;
import org.mapstruct.Mapper;


@Mapper(componentModel = "spring")
public interface ChatMapper {

    ChatRoom postDtoToChatRoom(ChatPostRequest request);
}
