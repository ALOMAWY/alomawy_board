import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useMyContext } from "./Context";

const Styled_MenuButton = styled.button`
  padding: 5px;
  min-width: 50px;
  max-width: 150px;
  height: 50px;
  transition: 0.4s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    text-transform: uppercase;
  }

  svg {
    color: var(--secondary-color);
  }

  &:hover {
    color: var(--secondary-color);
    transform: scale(1.2);
    background-color: var(--background-main-color);
  }

  &::before {
    content: "";
    width: 100%;
    height: 100%;
    border: 1px solid var(--main-color);
    border-radius: 5px;
    position: absolute;
    top: -1px;
    left: -1px;
    transition: 0.4s;
  }

  &:hover::before {
    transform: rotate3d(4, 3, 4, 360deg);
  }
`;

const ActionSelect = () => {
  const { setIsOpen, isOpen, setIsList } = useMyContext();

  return (
    <div
      onClick={(_) => {
        setIsOpen(!isOpen);
        setIsList(false);
      }}
    >
      <Styled_MenuButton>
        <FontAwesomeIcon icon={faPuzzlePiece} />
      </Styled_MenuButton>
    </div>
  );
};

export default ActionSelect;
