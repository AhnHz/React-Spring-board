import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function BoardDetail() {
    const [question, setQuestion] = useState();
    const [answer, setAnswer] = useState([]);
    const params = useParams();
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
    return (
        <div>
            여긴 게시글, 답변이 표시될 예정
        </div>
    )
}

export default BoardDetail