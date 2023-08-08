package com.example.demo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.text.Format;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 20)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    @JsonManagedReference   // 접근을 허용한다 (무한 참조 방지)
    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)  // Question과 Answer가 1:N 관계. cascade 같이 삭제한다
    private List<Answer> answerList;
}
