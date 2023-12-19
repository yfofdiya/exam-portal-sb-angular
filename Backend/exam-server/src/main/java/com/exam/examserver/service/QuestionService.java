package com.exam.examserver.service;

import com.exam.examserver.entity.Question;
import com.exam.examserver.entity.User;

import java.util.List;
import java.util.Map;

public interface QuestionService {

    Question addQuestion(Question question);

    Question updateQuestion(Question question);

    List<Question> getAllQuestions();

    Question getByQuestionId(long quesId);

    void deleteByQuestionId(long quesId);

    List<Question> getRandomQuestionsByQuizId(long qId);

    List<Question> getAllQuestionsByQuizId(long qId);

    Map<String, Integer> evalQuiz(List<Question> questionList);
}
