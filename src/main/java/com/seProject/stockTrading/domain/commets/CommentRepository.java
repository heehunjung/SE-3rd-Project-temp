package com.seProject.stockTrading.domain.commets;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByOrderByIdDesc();
    List<Comment> findAllByPostId(Long id);
}