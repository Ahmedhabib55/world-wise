import styled from "./Button.module.css";

function Button({ children, onClick, type }) {
  return (
    <button className={`${styled.btn} ${styled[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
