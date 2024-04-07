import css from "./Options.module.css";

export default function Options({ onUpdate, total, setFeedback, intial }) {
  return (
    <div className={css.container}>
      <button onClick={() => onUpdate("good")} className={css.button}>
        Good
      </button>
      <button onClick={() => onUpdate("neutral")} className={css.button}>
        Neutral
      </button>
      <button onClick={() => onUpdate("bad")} className={css.button}>
        Bad
      </button>
      {total > 0 && (
        <button onClick={() => setFeedback(intial)} className={css.button}>
          Reset
        </button>
      )}
    </div>
  );
}
