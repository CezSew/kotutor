import React from "react";
import Header from "../../parts/Header";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { decodeQuestions } from './utils/decodeQuestions';
import { SingleTestProps, SingleTestState } from './utils/types';
import getQuestion from './utils/getQuestion';
import highlightAnswerElement from './utils/highlightAnswerElement';
import Answers from "./Question/Answers";
import '../../../css/pages/test.scss';
import { Loader } from "../../utils/Loader";
import { sendQuizFinishedByUser } from "./utils/sendQuizFinishedByUser";
import AuthOverlord from '../../auth/AuthOverlord';

class SingleTest extends React.Component<SingleTestProps, SingleTestState> {
    constructor(props) {
        super(props);

        this.state = {
            stats: {},
            lastQuestionIndex: 0,
            questionsProbabilityArray: [],
            currentQuestion: [],
            questions: []
        };

        this.goToTheNextQuestion = this.goToTheNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
    }

    shouldRender() {
        if(typeof this.props.location === 'undefined' || typeof this.props.location.state === 'undefined') {
            return false;
        }
        return true;
    }

    goToTheNextQuestion(isCorrect) {
        let newQuestionsProbabilityArray = [...this.state.questionsProbabilityArray];

        if(!isCorrect) {
            newQuestionsProbabilityArray.push(this.state.lastQuestionIndex);
        } else {
            const indexToDelete = newQuestionsProbabilityArray.indexOf(this.state.lastQuestionIndex);
            newQuestionsProbabilityArray.splice(indexToDelete, 1);
        }

        const nextQuestion = getQuestion(this.state.questions, this.state.lastQuestionIndex, newQuestionsProbabilityArray);

        if(newQuestionsProbabilityArray.length > 1) {
            this.setState({
                questionsProbabilityArray: newQuestionsProbabilityArray,
                currentQuestion: nextQuestion,
                lastQuestionIndex: nextQuestion[1]
            })
        } else {
            const quizId = this.props.location.state.quiz['id'];
            const userId = typeof this.props.user['id'] !== 'undefined'
                ? this.props.user['id']
                : 'guest';

            sendQuizFinishedByUser(userId, quizId);
        }
    }

    handleAnswer(target, isCorrect) {
        highlightAnswerElement(target, isCorrect);

        setTimeout(() => {
            this.goToTheNextQuestion(isCorrect);
        }, 1500);
    }

    initModule() {
        if(!this.state.currentQuestion.length && this.shouldRender()) {
            const quiz = this.props.location.state.quiz;
            const questions = decodeQuestions(quiz.questions);
            const keys = Object.keys(questions).map(key => Number(key) - 1).filter(num => { return !isNaN(num)});
            const questionsProbabilityArray = [...keys];
            const currentQuestion = getQuestion(questions, this.state.lastQuestionIndex, this.state.questionsProbabilityArray);

            this.setState({
                questionsProbabilityArray: questionsProbabilityArray,
                currentQuestion: currentQuestion,
                questions: questions
            })
        }
    }

    render() {
        if(!this.shouldRender()) return <Redirect to="tests-main" />;
        this.initModule();

        if(this.state.currentQuestion.length) {
            return (
                <AuthOverlord>
                    <Header/>
                    <main className="c-test">
                        <div className="o-container">
                            <h2 className="c-test__question-title">{this.state.currentQuestion[0]['question']}</h2><br/>
                            <Answers question={this.state.currentQuestion[0]} handleAnswer={this.handleAnswer}/>
                        </div>
                    </main>
                </AuthOverlord>
            );
        } else {
            return (
                <AuthOverlord>
                    <Header/>
                    <main className="c-test">
                        <div className="o-container">
                            <Loader />
                        </div>
                    </main>
                </AuthOverlord>
            )
        }
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, null)(SingleTest)
