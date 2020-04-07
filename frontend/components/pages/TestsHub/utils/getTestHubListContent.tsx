import {QuizLine} from "../QuizLine";
import React from "react";

const getTestHubListContent = (data) => {
    let renderData;
    const quizesNotFound = typeof data['msg'] !== 'undefined';

    if(quizesNotFound) {
        renderData = (<p className="c-test-hub__table-no-quiz-found"><b>{data['msg']}</b></p>);
    } else {
        renderData = Object.keys(data).map((keyName, i) => <QuizLine key={i} quiz={data[keyName]}/>);
    }

    return renderData;
}

export default getTestHubListContent
