package com.capstone.capstone_design.domain.notice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "공지사항 생성 요청 DTO")
public class NoticeCreateRequestDto {

    @Schema(description = "관리자 ID", example = "1")
    private Long adminId;

    @Schema(description = "공지사항 제목", example = "시스템 점검 안내")
    private String title;

    @Schema(description = "공지사항 내용", example = "2025년 1월 25일 오전 2시~4시 시스템 점검이 있습니다.")
    private String content;
}
