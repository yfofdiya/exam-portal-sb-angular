package com.exam.examserver.repository;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByCategory(Category category);

    List<Quiz> findByActiveTrue();

    List<Quiz> findByCategoryAndActiveTrue(Category category);
}
