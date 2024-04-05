import css from "./Feedback.module.css";

export default function Feedback({ children }) {
    return <p className={css.text}>{children}</p>;
}
