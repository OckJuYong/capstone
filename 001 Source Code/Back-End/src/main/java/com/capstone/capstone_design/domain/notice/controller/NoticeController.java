package com.capstone.capstone_design.domain.notice.controller;

import com.capstone.capstone_design.domain.notice.dto.NoticeResponseDto;
import com.capstone.capstone_design.domain.notice.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notices")
@RequiredArgsConstructor
@Tag(name = "공지사항 API (공개)")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    @Operation(summary = "공지사항 목록 조회")
    public ResponseEntity<List<NoticeResponseDto>> getAllNotices() {
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @GetMapping("/{noticeId}")
    @Operation(summary = "공지사항 상세 조회")
    public ResponseEntity<NoticeResponseDto> getNoticeById(@PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.getNoticeById(noticeId));
    }
}
