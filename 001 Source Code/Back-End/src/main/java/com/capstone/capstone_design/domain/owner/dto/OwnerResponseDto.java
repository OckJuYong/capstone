package com.capstone.capstone_design.domain.owner.dto;

import com.capstone.capstone_design.domain.owner.model.Owner;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "사장님 정보 응답 DTO")
public class OwnerResponseDto {

    @Schema(description = "사장님 ID", example = "1")
    private Long id;

    @Schema(description = "이름", example = "김사장")
    private String name;

    @Schema(description = "이메일", example = "owner@example.com")
    private String email;

    @Schema(description = "소유 식당 수", example = "3")
    private int restaurantCount;

    public static OwnerResponseDto from(Owner owner) {
        return OwnerResponseDto.builder()
                .id(owner.getId())
                .name(owner.getName())
                .email(owner.getEmail())
                .restaurantCount(owner.getRestaurants().size())
                .build();
    }
}
