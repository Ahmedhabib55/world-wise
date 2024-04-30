import styled from "./BackButton.module.css";

function BackButton({ onClick }) {
  return (
    <button className={`${styled.btn} ${styled.back}`} onClick={onClick}>
      &larr; Back
    </button>
  );
}

export default BackButton;
