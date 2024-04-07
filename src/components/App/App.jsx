import css from "./App.module.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import { useState, useEffect } from "react";

export default function App() {
  const intial = {
    good: 0,
    neutral: 0,
    bad: 0,
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

    setFeedback(updatedFeedback);
  };
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback =
    feedback.total !== 0
      ? Math.round((feedback.good / totalFeedback) * 100)
      : 0;

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
        total={totalFeedback}
        setFeedback={setFeedback}
        intial={intial}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positive={positiveFeedback}
        />
      ) : (
        <Notification text="No feedback yet" />
      )}
    </div>
  );
}
