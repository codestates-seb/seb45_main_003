package main.wonprice.domain.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.time.LocalDateTime;

@Getter @Setter
@Builder
public class ProductResponseDto {
    private Long productId;

    private String title;

    private String description;

    private Long immediatelyBuyPrice; // 즉시 구매가

    private Long views;

    private LocalDateTime createAt;

    private LocalDateTime modifiedAt;

    private LocalDateTime deletedAt;

    // 상품 등록 날짜 갱신 메서드
    @PrePersist
    public void prePersist(){
        createAt = LocalDateTime.now();
    }

    // 상품 정보 수정 날짜 갱신 메서드
    @PreUpdate
    public void preUpdate(){
        modifiedAt = LocalDateTime.now();
    }
}
