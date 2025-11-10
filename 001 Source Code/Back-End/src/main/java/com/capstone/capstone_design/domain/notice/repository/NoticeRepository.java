package com.capstone.capstone_design.domain.notice.repository;

import com.capstone.capstone_design.domain.notice.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    // 최신순 정렬로 모든 공지사항 조회
    List<Notice> findAllByOrderByIdDesc();
}
