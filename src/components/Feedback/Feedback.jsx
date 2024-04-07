import css from "./Feedback.module.css";

export default function Feedback({
  feedback: { good, neutral, bad, total, positive },
}) {
  return (
    <div>
      <p className={css.text}>Good: {good}</p>
      <p className={css.text}>Neutral: {neutral}</p>
      <p className={css.text}>Bad: {bad}</p>
      <p className={css.text}>Total: {total}</p>
      <p className={css.text}>Positive: {positive}%</p>
    </div>
  );
}
