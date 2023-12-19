package com.exam.examserver.service;

import com.exam.examserver.entity.Question;
import com.exam.examserver.entity.Quiz;
import com.exam.examserver.entity.User;
import com.exam.examserver.repository.QuestionRepository;
import com.exam.examserver.repository.QuizRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Override
    public Question addQuestion(Question question) {
        question.setImage("java.png");
        return questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question getByQuestionId(long quesId) {
        return questionRepository.findById(quesId).get();
    }

    @Override
    public void deleteByQuestionId(long quesId) {
        questionRepository.deleteById(quesId);
    }

    @Override
    public List<Question> getRandomQuestionsByQuizId(long qId) {
        Quiz quiz = quizRepository.findById(qId).get();
        Set<Question> questions = quiz.getQuestions();
        List<Question> questionsList = new ArrayList<>(questions);
        if (questionsList.size() > Integer.parseInt(quiz.getNumberOfQuestions())) {
            Collections.shuffle(questionsList);
            questionsList = questionsList.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
        } else {
            Collections.shuffle(questionsList);
        }
        return questionsList;
    }

    @Override
    public List<Question> getAllQuestionsByQuizId(long qId) {
        Quiz quiz = quizRepository.findById(qId).get();
        Set<Question> questions = quiz.getQuestions();
        List<Question> allQuestionsList = new ArrayList<>(questions);
        return allQuestionsList;
    }

    @Override
    public Map<String, Integer> evalQuiz(List<Question> questionList) {
        int marksGot = 0;
        int correct = 0;
        int wrong = 0;
        int attempted = 0;
        int marksForEachQuestion =
                Integer.parseInt(questionList.get(0).getQuiz().getMaxMarks()) / questionList.size();
        for (Question q : questionList) {
            if (q.getSelectedAnswer() != null) {
                if (q.getSelectedAnswer().equalsIgnoreCase(q.getAnswer())) {
                    correct++;
                    marksGot += marksForEachQuestion;
                }
                if (!q.getSelectedAnswer().equals("")) {
                    attempted++;
                }
            }
        }
        wrong = attempted - correct;

        Map<String, Integer> objectMap = Map.of(
                "marksGot", marksGot,
                "correct", correct,
                "wrong", wrong,
                "attempted", attempted
        );
        return objectMap;
    }
}
