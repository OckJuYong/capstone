package com.capstone.capstone_design.domain.notice.dto;

import com.capstone.capstone_design.domain.notice.model.Notice;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "공지사항 응답 DTO")
public class NoticeResponseDto {

    @Schema(description = "공지사항 ID", example = "1")
    private Long id;

    @Schema(description = "공지사항 제목", example = "시스템 점검 안내")
    private String title;

    @Schema(description = "공지사항 내용", example = "2025년 1월 25일 오전 2시~4시 시스템 점검이 있습니다.")
    private String content;

    @Schema(description = "작성자 이름", example = "관리자")
    private String adminName;

    public static NoticeResponseDto from(Notice notice) {
        return NoticeResponseDto.builder()
                .id(notice.getId())
                .title(notice.getTitle())
                .content(notice.getContent())
                .adminName(notice.getAdmin().getName())
                .build();
    }
}