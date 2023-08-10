package com.example.demo;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    // React.js 에서 http://localhost:8080/board (spring 백엔드) 주소로 접근했을 때 ~
    @GetMapping("/board")
    public List<Question> getlist() {
        return questionRepository.findAll();
    }

    @GetMapping("/board/{id}")
    public Optional<Question> detail(@PathVariable("id") Integer id) {
        return questionRepository.findById(id);
    }

    @PostMapping("/answer-create/{id}")
    public void answerSubmit(@PathVariable("id") Integer id, @RequestBody Map<String, String> map) {
        Question question = this.questionRepository.getReferenceById(id);   // 해당 아이디에 대한 질문글
        Answer answer = new Answer();
        answer.setContent(map.get("content"));
        answer.setCreateDate(LocalDateTime.now());
        answer.setQuestion(question);
        answerRepository.save(answer);
    }

    @PostMapping("/question-create")
    public void questionSubmit(@RequestBody Map<String, String> map) {
        Question q = new Question();
        q.setSubject(map.get("subject"));
        q.setContent(map.get("content"));
        q.setCreateDate(LocalDateTime.now());
        questionRepository.save(q);
    }

    @PutMapping("/question-modify/{id}")
    public void questionModify(@PathVariable("id") Integer id, @RequestBody Map<String, String> map) {
        //System.out.println(map);
        Question q = this.questionRepository.getReferenceById(id);
        q.setSubject(map.get("subject"));
        q.setContent(map.get("content"));
        q.setModifyDate(LocalDateTime.now());
        questionRepository.save(q);
    }

    @DeleteMapping("/question-delete/{id}")
    public String questionDelete(@PathVariable("id") Integer id) {
        Optional<Question> question = this.questionRepository.findById(id);
        if (question.isPresent()) {
            Question q = question.get();
            questionRepository.delete(q);
            return null;
        } else {
        }
    }
}