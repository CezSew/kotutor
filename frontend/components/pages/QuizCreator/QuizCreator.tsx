import React from "react";
import { connect } from 'react-redux';
import AuthOverlord from "../../auth/AuthOverlord";
import Header from "../../parts/Header";
import InputLine from "../../parts/InputLine";
import '../../../css/pages/quizCreator.scss';
import { createTest } from '../../../helpers/createTest';
import fileLoadModule from '../../../helpers/fileLoadModule';
import { showContainer, selectQuizType } from './utils';

interface QuizCreatorProps {
    user: {
        name: string|undefined
    },
    history: Object
}

class QuizCreator extends React.Component<QuizCreatorProps> {

    componentDidMount() {
        fileLoadModule();
    }

   render() {
    return (
        <AuthOverlord>
            <Header />
            <main className="c-quiz-creator">
                <div className="o-container">
                    <form className="o-form c-quiz-creator-form" onSubmit={(e) => createTest(e, this.props.history)}>
                        <p className="o-form__title o-title o-title--h2 o-title--line">
                            Dodaj quiz
                        </p>
                        <div className="c-quiz-creator-form__content">
                            <div className="c-quiz-creator-form__inputs">
                                <InputLine name="name" type="text" placeholder="nazwa testu" icon="letter"/>
                                <InputLine name="type" type="text" placeholder="typ testu" classes="o-hidden"/>
                                <InputLine name="hidden-questions" type="text" placeholder="pytania" classes="o-hidden"/>
                            </div>
                            <div>
                                <p>Typ testu</p>
                                <div className="c-quiz-creator__quiz-types">
                                    <div className="c-quiz-creator__quiz-type js-quiz-type-option" onClick={(e) => selectQuizType(e.target)}>
                                        prosty
                                    </div>
                                    <div className="c-quiz-creator__quiz-type js-quiz-type-option" onClick={(e) => selectQuizType(e.target)}>
                                        losowy
                                    </div>
                                    <div className="c-quiz-creator__quiz-type js-quiz-type-option" onClick={(e) => selectQuizType(e.target)}>
                                        nauka
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Dodaj pytania</p>
                                <div className="c-quiz-creator__quiz-types">
                                    <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-creator"  onClick={(e) => showContainer(e.target)}>
                                        kreator
                                    </div>
                                    <div className="c-quiz-creator__quiz-type js-add-question-method-option js-open-dropfile c-quiz-creator__quiz-type--file" onClick={(e) => showContainer(e.target)}>
                                        plik
                                    </div>
                                </div>
                            </div>
                            <div className="c-quiz-creator-form__dropfile js-quiz-creator-form__dropfile o-hidden">
                                <div className="js-file-holder" id="holder"></div>
                                <p id="status">Przeciągnij plik .txt</p>
                            </div>
                            <div className="c-quiz-creator__tool js-quiz-creator__tool o-hidden">
                                Here is a creation wizard tool!
                            </div>
                        </div>
                        <InputLine name="submit" type="submit" value="Dodaj test" classes="o-input--submit"/>
                    </form>
                </div>
            </main>
        </AuthOverlord>
    )
   }
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps, null)(QuizCreator)
