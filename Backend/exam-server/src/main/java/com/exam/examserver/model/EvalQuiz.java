package com.exam.examserver.model;

import com.exam.examserver.entity.Question;
import com.exam.examserver.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EvalQuiz {
    private List<Question> questionList;
    private User user;
}
