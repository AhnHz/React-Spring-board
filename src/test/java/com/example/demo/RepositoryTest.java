package com.example.demo;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.Optional;

@SpringBootTest
public class RepositoryTest {

    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private AnswerRepository answerRepository;

    @Test
    void testJpa_1() {
        Question q1 = new Question();
        q1.setSubject("질문 제목");
        q1.setContent("질문의 내용입니다.");
        q1.setCreateDate(LocalDateTime.now());
        this.questionRepository.save(q1);
    }

    @Test
    void testJpa_2() {
        Optional<Question> oq = this.questionRepository.findById(1);    // 아이디가 1인 글
        Assertions.assertTrue(oq.isPresent());
        Question q = oq.get();

        Answer a1 = new Answer();
        a1.setContent("질문1의 답변1 입니다.");
        a1.setQuestion(q);
        a1.setCreateDate(LocalDateTime.now());
        this.answerRepository.save(a1);     // answer 테이블에 저장

        Answer a2 = new Answer();
        a2.setContent("질문1의 답변2 입니다.");
        a2.setQuestion(q);
        a2.setCreateDate(LocalDateTime.now());
        this.answerRepository.save(a2);
    }
}
