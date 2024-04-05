import css from "./App.module.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import { useState, useEffect } from "react";

export default function App() {
  const localFeedbackKey = "feedbackKey";
  const initialFeedback = {
    good: 0,
    neutral: 0,
    bad: 0,
    totalFeedback: 0,
    positiveFeedback: 0,
  };
  const [feedback, setFeedback] = useState(() => {
    const savedClicks = window.localStorage.getItem(localFeedbackKey);
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return initialFeedback;
  });

  useEffect(() => {
    const savedFeedback = localStorage.getItem(localFeedbackKey);
    if (savedFeedback) {
      setFeedback(JSON.parse(savedFeedback));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localFeedbackKey, JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
      totalFeedback: prevFeedback.totalFeedback + 1,
      positiveFeedback: Math.round(
        ((prevFeedback.good + 1) / (prevFeedback.totalFeedback + 1)) * 100
      ),
    }));
  };

  const feedbackReset = () => {
    setFeedback(initialFeedback);
  };

  return (
    <div className={css.conteiner}>
      <Description
        title="Sip Happens Café"
        text="Please leave your feedback about our service by selecting one of the options below."
      />
      <div className={css.wrapper}>
        <Options updateFeedback={updateFeedback} feedbackType="good">
          Good
        </Options>

        <Options updateFeedback={updateFeedback} feedbackType="neutral">
          Neutral
        </Options>

        <Options updateFeedback={updateFeedback} feedbackType="bad">
          Bad
        </Options>

        {feedback.totalFeedback > 0 && (
          <Options updateFeedback={feedbackReset} feedbackType="reset">
            Reset
          </Options>
        )}
      </div>

      {/* If renderyng text */}

      {/* {totalFeedback > 0 ? (
                <div>
                    <Feedback>Good: {feedback.good}</Feedback>
                    <Feedback>Neutral: {feedback.neutral}</Feedback>
                    <Feedback>Bad: {feedback.bad}</Feedback>
                    <Feedback>Total: {totalFeedback}</Feedback>
                    <Feedback>Positive: {positiveFeedback}%</Feedback>
                </div>
            ) : (
                <p>No feedback yet</p>
            )} */}

      <div>
        <Feedback>Good: {feedback.good}</Feedback>
        <Feedback>Neutral: {feedback.neutral}</Feedback>
        <Feedback>Bad: {feedback.bad}</Feedback>
        <Feedback>Total: {feedback.totalFeedback}</Feedback>
        <Feedback>Positive: {feedback.positiveFeedback}%</Feedback>
      </div>
    </div>
  );
}
