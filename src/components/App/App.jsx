import css from "./App.module.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
// import Notification from "../Notification/Notification";
import { useState, useEffect } from "react";

export default function App() {
  const intial = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positive: 0,
  };
  const localFeedbackKey = "feedbackKey";
  const [feedback, setFeedback] = useState(() => {
    const savedFeedbackLocal = window.localStorage.getItem(localFeedbackKey);
    return savedFeedbackLocal !== null
      ? JSON.parse(savedFeedbackLocal)
      : intial;
  });

  const updateFeedback = (feedbackType) => {
    const updatedFeedback = {
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    };

    updatedFeedback.total =
      updatedFeedback.good + updatedFeedback.neutral + updatedFeedback.bad;

    updatedFeedback.positive =
      updatedFeedback.total !== 0
        ? Math.round((updatedFeedback.good / updatedFeedback.total) * 100)
        : 0;

    setFeedback(updatedFeedback);
  };

  useEffect(() => {
    localStorage.setItem(localFeedbackKey, JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className={css.conteiner}>
      <Description
        title="Sip Happens Café"
        text="Please leave your feedback about our service by selecting one of the options below."
      />
      <Options
        onUpdate={updateFeedback}
        total={feedback.total}
        setFeedback={setFeedback}
        intial={intial}
      />
      {/* {feedback.total > 0 ? (
        <Feedback feedback={feedback} />
      ) : (
        <Notification text="No feedback yet" />
      )} */}
      <Feedback feedback={feedback} />
    </div>
  );
}
