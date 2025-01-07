import React, { useEffect, useReducer } from 'react';
import Header from './header.jsx'
import '../style/style.css';

function QuestionList({ questions, dispatch, answer }) {
    return (
        <>
            <p className="question">{questions.question}</p>
            <Options values={questions} dispatch={dispatch} answer={answer} />
        </>
    );
}

const Options = ({ values, dispatch, answer }) => {
    const hasAnswered = answer !== null;
    return (
        <div className="options-container">
            {values.options.map((item, index) => (
                <button
                    className={`btn ${answer === index ? "answer" : ""} ${hasAnswered && index === values.correctOption ? "correct" : "wrong"}`}
                    key={index}
                    disabled={hasAnswered}
                    onClick={() => dispatch({ type: "newAnswer", payload: index })}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

const Progress = ({ index, points, numQuestion, totalPoints, answer }) => {
    return (
        <div className="progress-container">
            <progress max={numQuestion} value={index + Number(answer !== null)} />
            <div className="progress-text">
                <p><strong>{index + 1}</strong>/{numQuestion}</p>
                <p>Total Score: <strong>{points}</strong>/{totalPoints}</p>
            </div>
        </div>
    );
};

const FinishedScreen = ({ totalPoints, points, highScore, dispatch }) => {
    const percentage = (points / totalPoints) * 100;

    return (
        <div className="finished-screen">
            <p>You Scored <strong>{points}</strong> out of {totalPoints} ({Math.ceil(percentage)}%)</p>
            <p>(Highscore: {highScore} points)</p>
            <button onClick={() => dispatch({ type: "restart" })}>Restart</button>
        </div>
    );
};

const initialstate = {
    questions: [],
    status: 'Loading',
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            };
        case "dataFailed":
            return {
                ...state,
                status: "error"
            };
        case "start":
            return {
                ...state,
                status: "active"
            };
        case "nextQuestion":
            return {
                ...state,
                index: state.index + 1,
                answer: null
            };
        case "newAnswer":
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: question.correctOption === action.payload
                    ? state.points + question.points
                    : state.points
            };
        case "finished":
            return {
                ...state,
                status: "finished",
                index: 0,
                highScore: state.points > state.highScore
                    ? state.points
                    : state.highScore,
            };
        case "restart":
            return {
                ...initialstate,
                questions: state.questions,
                highScore: state.highScore,
                status: "ready"
            };
        default:
            throw new Error("undefined type");
    }
}

function Main() {
    const [state, dispatch] = useReducer(reducer, initialstate);
    const { questions, status, index, answer, points, highScore } = state;
    const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:4000/questions");
                const data = await response.json();
                dispatch({ type: "dataReceived", payload: data });
            } catch (err) {
                dispatch({ type: "dataFailed" });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Header/>
            <div className="container">
                {status === 'Loading' && <p>Loading...</p>}
                {status === 'error' && <p>Error loading data</p>}
                {status === 'ready' && (
                    <>
                        <h1>Welcome to The React Quiz</h1>
                        <h2>{questions.length} Questions to test your React mastery</h2>
                        <button onClick={() => dispatch({ type: "start" })}>Let's start</button>
                    </>
                )}
                {status === 'active' && (
                    <>
                        <Progress
                            index={index}
                            points={points}
                            numQuestion={questions.length}
                            totalPoints={totalPoints}
                            answer={answer}
                        />
                        <QuestionList
                            questions={questions[index]}
                            dispatch={dispatch}
                            answer={answer}
                        />
                        {index < questions.length - 1 &&
                            answer !== null && (
                                <button onClick={() => dispatch({ type: "nextQuestion" })}>Next</button>
                            )}
                        {index === questions.length - 1 &&
                            answer !== null && (
                                <button onClick={() => dispatch({ type: "finished" })}>Finished</button>
                            )}
                    </>
                )}
                {status === "finished" && (
                    <FinishedScreen
                        totalPoints={totalPoints}
                        points={points}
                        highScore={highScore}
                        dispatch={dispatch}
                    />
                )}
            </div>
        </>
    );
}

export default Main;