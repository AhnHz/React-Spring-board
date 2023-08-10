import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Board() {
    const [questionList, setQuestionList] = useState([]);

    useEffect(() => {
        async function getQuestionList() {
            try {
                const result = await axios.get("http://localhost:8080/board");  //에서 받아서
                setQuestionList(result.data);
                console.log(result.data);
            } catch (error){
                console.log(error);
            }
        }
    
        getQuestionList();

    }, []);

    return (
        <div>
            <Link to={"/question-create"} className="btn btn-primary mb-2">질문등록</Link>
            <table className="table text-center">
                <thead className="table-dark">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>날짜</th>

                    </tr>
                </thead>

                <tbody>
                    {questionList.map((question, index) => {
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <Link 
                                        className="text-decoration-none"
                                        to={`/board/${question.id}`}>
                                        {question.subject}
                                        <span className="text-danger ms-2">
                                            <sup>[{question.answerList.length}]</sup>
                                        </span>
                                    </Link>
                                </td>
                                <td>{question.createDate}</td>
                            </tr>
                        )
                    })}                   
                </tbody>
            </table>
        </div>
    )
}

export default Board;