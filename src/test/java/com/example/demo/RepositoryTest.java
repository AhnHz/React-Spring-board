package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
public class RepositoryTest {

    @Autowired
    private QuestionRepository questionRepository;

    @Test
    void testJpa_1 () {
        Question q1 = new Question();
        q1.setSubject("질문 제목");
        q1.setContent("질문의 내용입니다.");
        q1.setCreateDate(LocalDateTime.now());
        this.questionRepository.save(q1);
    }
}
