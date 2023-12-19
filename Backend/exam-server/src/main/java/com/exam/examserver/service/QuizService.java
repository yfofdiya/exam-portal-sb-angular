package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Quiz;

import java.util.List;

public interface QuizService {

    Quiz addQuiz(Quiz quiz);

    Quiz updateQuiz(Quiz quiz);

    List<Quiz> getAllQuizzes();

    Quiz getByQuizId(long qId);

    void deleteByQuizId(long qId);

    List<Quiz> getQuizzesByCategoryId(long cId);

    List<Quiz> getAllActiveQuizzes();

    List<Quiz> getActiveQuizzesByCategoryId(long cId);
}
