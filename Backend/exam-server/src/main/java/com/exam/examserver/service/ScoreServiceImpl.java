package com.exam.examserver.service;

import com.exam.examserver.entity.Score;
import com.exam.examserver.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScoreServiceImpl implements ScoreService {

    @Autowired
    private ScoreRepository scoreRepository;

    @Override
    public Score saveScore(Score score) {
        return scoreRepository.save(score);
    }
}
