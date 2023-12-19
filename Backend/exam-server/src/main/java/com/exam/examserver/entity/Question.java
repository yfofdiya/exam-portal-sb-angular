package com.exam.examserver.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long quesId;

    private String content;
    private String image;
    private String option1;
    private String option2;
    private String option3;
    private String option4;

//    @JsonIgnore
    private String answer;

    @Transient
    private String selectedAnswer;

    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
