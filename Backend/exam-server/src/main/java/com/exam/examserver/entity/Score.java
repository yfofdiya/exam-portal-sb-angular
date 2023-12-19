package com.exam.examserver.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.apachecommons.CommonsLog;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Entity
@Table(name = "scores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "total_marks")
    private int marksGot;

    @Column(name = "correct_answers")
    private int correct;

    @Column(name = "wrong_answers")
    private int wrong;

    @Column(name = "total_attempted_questions")
    private int attempted;

    private long userId;
    private long quizId;
    private long categoryId;

    private Date createdDate;

    public Score(int marksGot, int correct, int wrong, int attempted, long userId, long quizId, long categoryId, Date createdDate) {
        this.marksGot = marksGot;
        this.correct = correct;
        this.wrong = wrong;
        this.attempted = attempted;
        this.userId = userId;
        this.quizId = quizId;
        this.categoryId = categoryId;
        this.createdDate = createdDate;
    }
}
