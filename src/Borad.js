import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Borad() {
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
                                    <Link to={`/board/${question.id}`}>
                                        {question.subject}
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

export default Borad;