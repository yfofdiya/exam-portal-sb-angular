package com.exam.examserver.controller;

import com.exam.examserver.entity.Quiz;
import com.exam.examserver.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin("http://localhost:4200/")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> add(@RequestBody Quiz quiz) {
        return ResponseEntity.ok().body(quizService.addQuiz(quiz));
    }

    @GetMapping
    public ResponseEntity<List<Quiz>> getAll() {
        return ResponseEntity.ok().body(quizService.getAllQuizzes());
    }

    @GetMapping("/{qId}")
    public ResponseEntity<Quiz> getByQId(@PathVariable long qId) {
        return ResponseEntity.ok().body(quizService.getByQuizId(qId));
    }

    @PutMapping
    public ResponseEntity<Quiz> update(@RequestBody Quiz quiz) {
        return ResponseEntity.ok().body(quizService.updateQuiz(quiz));
    }

    @DeleteMapping("/{qId}")
    public void deleteByQId(@PathVariable long qId) {
        quizService.deleteByQuizId(qId);
    }

    // Get all quizzes by category ID
    @GetMapping("/category/{cId}")
    public ResponseEntity<List<Quiz>> getQuizzesByCategoryId(@PathVariable long cId) {
        return ResponseEntity.ok().body(quizService.getQuizzesByCategoryId(cId));
    }

    // Get all active quizzes
    @GetMapping("/active")
    public ResponseEntity<List<Quiz>> getAllActiveQuizzes() {
        return ResponseEntity.ok().body(quizService.getAllActiveQuizzes());
    }

    // Get all active quizzes by category ID
    @GetMapping("/active/category/{cId}")
    public ResponseEntity<List<Quiz>> getActiveQuizzesByCategoryId(@PathVariable long cId) {
        return ResponseEntity.ok().body(quizService.getActiveQuizzesByCategoryId(cId));
    }
}
