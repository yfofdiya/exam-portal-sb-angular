package com.exam.examserver.controller;

import com.exam.examserver.entity.Question;
import com.exam.examserver.entity.Score;
import com.exam.examserver.entity.User;
import com.exam.examserver.service.QuestionService;
import com.exam.examserver.service.QuizService;
import com.exam.examserver.service.ScoreService;
import com.exam.examserver.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin("http://localhost:4200/")
@Slf4j
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private ScoreService scoreService;

    @PostMapping
    public ResponseEntity<Question> add(@RequestBody Question question) {
        return ResponseEntity.ok().body(questionService.addQuestion(question));
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAll() {
        return ResponseEntity.ok().body(questionService.getAllQuestions());
    }

    @GetMapping("/{quesId}")
    public ResponseEntity<Question> getByQuesId(@PathVariable long quesId) {
        return ResponseEntity.ok().body(questionService.getByQuestionId(quesId));
    }

    @PutMapping
    public ResponseEntity<Question> update(@RequestBody Question question) {
        return ResponseEntity.ok().body(questionService.updateQuestion(question));
    }

    @DeleteMapping("/{quesId}")
    public void deleteByQuesIdId(@PathVariable long quesId) {
        questionService.deleteByQuestionId(quesId);
    }

    // Get some random questions by Quiz ID
    @GetMapping("/quiz/{qId}")
    public ResponseEntity<List<Question>> getRandomQuestionsByQuiz(@PathVariable long qId) {
        return ResponseEntity.ok().body(questionService.getRandomQuestionsByQuizId(qId));
    }

    // Get all questions by quiz ID
    @GetMapping("/quiz/all/{qId}")
    public ResponseEntity<List<Question>> getAllQuestionsByQuiz(@PathVariable long qId) {
        return ResponseEntity.ok().body(questionService.getAllQuestionsByQuizId(qId));
    }

    // Evaluating Questions/Answers and Save score to the DB
    @PostMapping("/eval-quiz/{userId}/{quizId}/{categoryId}")
    public ResponseEntity<Map<String, Integer>> evalQuiz(
            @RequestBody List<Question> questionList,
            @PathVariable long userId,
            @PathVariable long quizId,
            @PathVariable long categoryId
    ) {
        Map<String, Integer> map = questionService.evalQuiz(questionList);
        Score score = new Score(
                map.get("marksGot"),
                map.get("correct"),
                map.get("wrong"),
                map.get("attempted"),
                userId,
                quizId,
                categoryId,
                new Date()
        );
        scoreService.saveScore(score);
        return ResponseEntity.ok().body(map);
    }
}
