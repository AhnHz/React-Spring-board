import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"

function BoardDetail() {
    const [question, setQuestion] = useState({});   // {} 객체화
    const [answer, setAnswer] = useState([]);
    const params = useParams();
    const [answerText, setAnswerText] = useState("");
    const navigate = useNavigate();
    //console.log(params.id);

    useEffect(() => {
        async function getQuestion() {
            try {
                const result = await axios.get(`http://localhost:8080/board/${params.id}`)
                setQuestion(result.data);
                setAnswer(result.data.answerList);
            } catch(error) {
                console.log(error);
            }
        }
        getQuestion();
    }, [params.id])

    function onChange(event) {
        setAnswerText(event.target.value);
    }

    async function onSubmit(event){
        if (answerText === "") {
            alert("경고! 답변 내용을 입력하세요.")
        } else {
            event.preventDefault();
            try {
                const result = await axios.post(`http://localhost:8080/buy-create/${params.id}`,{content: buyText});
                
                if (result.status === 200) {
                    navigate(0);
                }
            } catch (error) {
                console.log(error);
            }
        }    
    }

    async function onDelete() {
        if (window.confirm("정말 삭제 하시겠습니까?")){
            try {
                await axios.delete(`http://localhost:8080/question-delete/${params.id}`);
                alert("삭제 완료")
                navigate("/board");
            } catch (error) {
                alert("네트워크 문제로 삭제할 수 없습니다.")
            }
        } else {
            alert("삭제 취소")
        }
    }

    
    return (
        <div>
            <h2 className="border-bottom py-2">{question.subject}</h2>
            <div className="card my-3">
                <div className="card-body">
                        <div className="card-text" style={{whiteSpace: "pre-line"}}>{question.content}</div>
                        <div className="d-flex justify-content-end">
                            <div className="badge bg-light text-dark p-2 text-start">
                                <div>작성 시간: {question.createDate}</div>
                                {question.modifyDate && <div className="mt-3">수정 시간: {question.modifyDate}</div>}
                            </div>
                        </div>

                        <div className="mt-3">
                            <Link
                                to={`/question-modify/${params.id}`}
                                className="btn btn-sm btn-outline-secondary"
                            >
                                수정
                            </Link>
                            <button
                                onClick={onDelete}
                                className="btn btn-sm btn-outline-danger ms-2"
                            >
                                삭제
                            </button>
                        </div>
                </div>
            </div>

            <h5 className="border-bottom my-3 py-2">{answer.length}개의 답변</h5>
            {answer.map((answer, index) => {
                return (
                    <div className="card my-3" key={index}>
                    <div className="card-body">
                        <div className="card-text" style={{whiteSpace: "pre-line"}}>{answer.content}</div>
                        <div className="d-flex justify-content-end">
                            <div className="badge bg-light text-dark p-2 text-start">
                                <div>{answer.createDate}</div>
                            </div>
                        </div>
                        <div className="mt-3">                  
                        </div>
                    </div>
                </div> 
                )
            })}

            <form onSubmit={onSubmit} className="my-3">
                <textarea onChange ={onChange} name="content" id="content" rows="10" className="form-control"></textarea>
                <input type="submit" value="답변등록" className="btn btn-primary my-2" />
            </form>
        </div>
    )
}

export default BoardDetail