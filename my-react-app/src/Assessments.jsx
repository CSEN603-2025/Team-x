import { useState } from "react";
import styles from './Assessments.module.css';

const mockAssessments = [
    {
        id: 1,
        name: "Personality Test",
        questions: [
            {
                id: 101,
                question: "You enjoy social gatherings.",
                options: ["Strongly Agree", "Agree", "Neutral", "Disagree"],
                correct: "Agree"
            },
            {
                id: 102,
                question: "You prefer to plan things ahead.",
                options: ["Strongly Agree", "Agree", "Neutral", "Disagree"],
                correct: "Strongly Agree"
            }
        ]
    },
    {
        id: 2,
        name: "Career Interests",
        questions: [
            {
                id: 201,
                question: "You like working with data more than people.",
                options: ["Yes", "No"],
                correct: "Yes"
            },
            {
                id: 202,
                question: "You enjoy creative tasks.",
                options: ["Yes", "No"],
                correct: "Yes"
            }
        ]
    }
];

function Assessments() {
    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleSelectAssessment = (assessment) => {
        setSelectedAssessment(assessment);
        setAnswers({});
        setScore(null);
    };

    const handleAnswer = (questionId, option) => {
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const handleSubmit = () => {
        const correctCount = selectedAssessment.questions.reduce((acc, q) => {
            return acc + (answers[q.id] === q.correct ? 1 : 0);
        }, 0);
        setScore(correctCount);
    };

    const handleExit = () => {
        setSelectedAssessment(null);
        setAnswers({});
        setScore(null);
    };

    return (
        <div className={`${styles.mainContainer} ${selectedAssessment ? styles.splitView : ''}`}>
            <div className={styles.choicesContainer}>
                <p>Please choose an online assessment:</p>
                {mockAssessments.map(assessment => (
                    <button
                        key={assessment.id}
                        onClick={() => handleSelectAssessment(assessment)}
                        className={styles.choiceButton}
                    >
                        {assessment.name}
                    </button>
                ))}
                <button onClick={handleExit} className={styles.exitButton}>Exit</button>
            </div>

            {selectedAssessment && (
                <div className={styles.assessmentDetails}>
                    <div className={styles.assessmentHeader}>
                        <h2>{selectedAssessment.name}</h2>
                        
                    </div>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {selectedAssessment.questions.map((q) => (
                            <div key={q.id} className={styles.questionBlock}>
                                <p><strong>{q.question}</strong></p>
                                {q.options.map((opt, idx) => (
                                    <label key={idx} className={styles.optionLabel}>
                                        <input
                                            type="radio"
                                            name={`question-${q.id}`}
                                            value={opt}
                                            checked={answers[q.id] === opt}
                                            
                                            onChange={() => handleAnswer(q.id, opt)}
                                        />
                                        <span className={styles.options}>{opt}</span>
                                    </label>
                                ))}
                            </div>
                        ))}

                        <button type="submit" className={styles.submitButton}>Submit</button>

                        {score !== null && (
                            <div>
                                <p className={styles.score}>You got {score} out of {selectedAssessment.questions.length} correct.</p>
                            <button type="submit" className={styles.choiceButton}>Post Score</button>

                            </div>
                            
                        )}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Assessments;
