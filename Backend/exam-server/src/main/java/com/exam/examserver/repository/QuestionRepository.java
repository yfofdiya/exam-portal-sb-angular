package com.exam.examserver.repository;

import com.exam.examserver.entity.Question;
import com.exam.examserver.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz(Quiz quiz);
}
