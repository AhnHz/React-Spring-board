import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BoardCreate() {

    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    function onChange (event) {
        if(event.target.name === "subject") {
            setSubject(event.target.value);
        } else {
            // event.target.name === "content"
            setContent(event.target.value);
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        //console.log("제목: " + subject);
        //console.log("내용: " + content);

        if (subject === "" || content === "") {
            alert("제목과 내용을 입력하세요.")
        } else {
            try {
                const result = await axios.post("http://localhost:8080/question-create", {
                    subject: subject,
                    content: content
                })
                if (result.status === 200) {
                    navigate("/board");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div>
            <h5 className="border-bottom pb-2">질문 등록</h5>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input onChange={onChange} value={subject} 
                        type="text" name="subject" id="subject" className="form-control"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea onChange={onChange} value={content} 
                        name="content" id="content" className="form-control" row="5">

                    </textarea>
                </div>
                <input type="submit" value="저장하기" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default BoardCreate;