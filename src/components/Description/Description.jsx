import css from "./Description.module.css";

export default function Description({ title, text }) {
    return (
        <div className={css.conteiner}>
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    );
}
