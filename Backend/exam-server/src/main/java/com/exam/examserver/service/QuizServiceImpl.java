package com.exam.examserver.service;

import com.exam.examserver.entity.Category;
import com.exam.examserver.entity.Quiz;
import com.exam.examserver.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getByQuizId(long qId) {
        return quizRepository.findById(qId).get();
    }

    @Override
    public void deleteByQuizId(long qId) {
        quizRepository.deleteById(qId);
    }

    @Override
    public List<Quiz> getQuizzesByCategoryId(long cId) {
        Category category = new Category();
        category.setCId(cId);
        return quizRepository.findByCategory(category);
    }

    @Override
    public List<Quiz> getAllActiveQuizzes() {
        return quizRepository.findByActiveTrue();
    }

    @Override
    public List<Quiz> getActiveQuizzesByCategoryId(long cId) {
        Category category = new Category();
        category.setCId(cId);
        return quizRepository.findByCategoryAndActiveTrue(category);
    }
}
