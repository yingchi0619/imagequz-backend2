import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import quizzes from './data';
import './style.scss';
import {Test, Quz, Score} from '../../api/list';
// console.log(quizzes)
function QuestionList(props){
    const [list, setList] = useState({});
    let [results, setResults] = useState({
        show: false,
        correct: 0,
        error: 0,
        score: 0
    });
    useEffect(() => {
        Quz({
            id: props.match.params.id
        }).then(res=>{
            if(res.code === 200){
                res.list.questions.forEach(v=>{
                    v.sAnswer = '';
                });
                setList(res.list);
            }
        })
        return () => {

        }
    }, []);
    // useEffect(()=>{
    //     console.log(111);
    //     setResults(results);
    // },[results]);
    let goListPage = function(){
        props.history.push({
            pathname: '/list'
        });
    };
    let selectOption = function(v, item){
        item.sAnswer = v;

    }
    let submitAnswer = function(){
        let correct = list.questions.filter(v=>v.sAnswer === v.answer).length;
        let error = list.questions.length - correct;
        let v = {
            show: true,
            correct,
            error,
            score: correct * 10,
        };
        setResults(v);
        Score({
            userId: JSON.parse(sessionStorage.getItem('userInfo')).id,
            data: v
        }).then(res=>{
            console.log(res);
        })
    }
    return (
        <div className="question-list">
            <Form className="sign-form">
                <ul className="list-box">
                    {
                        list.questions?
                        list.questions.map((v, i)=>{
                            return <li className="li-item" key={v.answer}>
                                {/*<h5 className="answer">{v.answer}</h5>*/}
                                <div className="pic">
                                    <img src={v.picture} />
                                </div>
                                <Form.Group className="options-list">
                                    {
                                        v.choices.map((v_, i_)=>{
                                            return <Form.Check
                                                key={v_}
                                                name={`choices_${i}`}
                                                type="radio"
                                                label={v_}
                                                id={`choices_${i}_${i_}`}
                                                onChange={()=>{selectOption(v_, v)}}
                                            />
                                        })
                                    }
                                </Form.Group>
                            </li>
                        })
                        :''
                    }
                </ul>
                {
                    results.show ?
                    <div className="results-box">
                        <h5>Congratulations on your answer，Total score：<span className="red">{list.questions.length * 10}</span></h5>
                        <div>Correct：<span className="green">{results.correct}</span></div>
                        <div>Error：<span className="red">{results.error}</span></div>
                        <div>Error：<span className="blue">{results.score}</span></div>
                    </div>
                    : ''
                }
                <div className="btn-box">
                    <Button variant="primary" onClick={submitAnswer}>confirm</Button>
                    <Button variant="danger" onClick={goListPage}>return</Button>
                </div>
            </Form>
        </div>
    )
}

export default QuestionList
