package com.capstone.capstone_design.domain.notice.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "공지사항 수정 요청 DTO")
public class NoticeUpdateRequestDto {

    @Schema(description = "공지사항 제목", example = "시스템 점검 안내 (수정)")
    private String title;

    @Schema(description = "공지사항 내용", example = "2025년 1월 25일 오전 3시~5시로 점검 시간이 변경되었습니다.")
    private String content;
}