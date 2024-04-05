import css from "./Options.module.css";

export default function Options({ children, updateFeedback, feedbackType }) {
    const handleClick = () => {
        updateFeedback(feedbackType);
    };

    return (
        <button onClick={handleClick} className={css.button}>
            {children}
        </button>
    );
}
