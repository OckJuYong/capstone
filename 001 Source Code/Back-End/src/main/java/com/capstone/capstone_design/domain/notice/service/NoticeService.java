package com.capstone.capstone_design.domain.notice.service;

import com.capstone.capstone_design.domain.admin.model.Admin;
import com.capstone.capstone_design.domain.admin.repository.AdminRepository;
import com.capstone.capstone_design.domain.notice.dto.NoticeCreateRequestDto;
import com.capstone.capstone_design.domain.notice.dto.NoticeResponseDto;
import com.capstone.capstone_design.domain.notice.dto.NoticeUpdateRequestDto;
import com.capstone.capstone_design.domain.notice.model.Notice;
import com.capstone.capstone_design.domain.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final AdminRepository adminRepository;

    // 공지사항 생성 (관리자)
    @Transactional
    public void createNotice(NoticeCreateRequestDto requestDto) {
        Admin admin = adminRepository.findById(requestDto.getAdminId())
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 관리자를 찾을 수 없습니다."));

        Notice notice = Notice.builder()
                .admin(admin)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .build();

        noticeRepository.save(notice);
    }

    // 공지사항 전체 조회 (모든 사용자)
    @Transactional(readOnly = true)
    public List<NoticeResponseDto> getAllNotices() {
        return noticeRepository.findAllByOrderByIdDesc().stream()
                .map(NoticeResponseDto::from)
                .collect(Collectors.toList());
    }

    // 공지사항 상세 조회 (모든 사용자)
    @Transactional(readOnly = true)
    public NoticeResponseDto getNoticeById(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 공지사항을 찾을 수 없습니다."));

        return NoticeResponseDto.from(notice);
    }

    // 공지사항 수정 (관리자)
    @Transactional
    public void updateNotice(Long noticeId, NoticeUpdateRequestDto requestDto) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 공지사항을 찾을 수 없습니다."));

        notice.update(requestDto.getTitle(), requestDto.getContent());
    }

    // 공지사항 삭제 (관리자)
    @Transactional
    public void deleteNotice(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId)
                .orElseThrow(() -> new NoSuchElementException("해당 ID의 공지사항을 찾을 수 없습니다."));

        noticeRepository.delete(notice);
    }
}
