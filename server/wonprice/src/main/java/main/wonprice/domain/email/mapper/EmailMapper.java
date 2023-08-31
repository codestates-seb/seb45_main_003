package main.wonprice.domain.email.mapper;

import main.wonprice.domain.email.dto.EmailAuthDto;
import main.wonprice.domain.email.entity.AuthEmail;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmailMapper{
    AuthEmail authDtoToEmail(EmailAuthDto emailAuthDto);
}
