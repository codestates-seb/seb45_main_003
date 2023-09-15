package main.wonprice.domain.member.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class WishDeleteDto {

    private List<Boolean> checkBox;

    private int currentPage;
}
