import {
  faBrush,
  faCircleInfo,
  faDownload,
  faLanguage,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useMyContext } from "./Context";
import Name from "./Name";
import { useTranslation } from "react-i18next";
import { handleChangeLang, handleChangeTheme } from "../utils";
import { getItemFromLocalStorage } from "../utils/localStorage";

const Styled_Navbar = styled.nav``;

const Holder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid var(--secondary-color);
`;

const Buttons_List = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  overflow: hidden;
`;

export const Navigation_Button = styled.li`
  padding: 5px;
  min-width: 50px;
  max-width: 160px;
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

  a {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    padding: 10px;
  }
`;

const ActionsNavbar = () => {
  const { isList, setIsList } = useMyContext();
  const { i18n } = useTranslation();

  return (
    <Holder className={!isList ? "translate-x-l" : ""}>
      <Name />
      <Styled_Navbar>
        <Buttons_List>
          <Navigation_Button
            className="theme-btn"
            onClick={() => {
              const currentColor = getItemFromLocalStorage(
                "theme-color",
                "blue"
              );
              handleChangeTheme(currentColor);
            }}
          >
            <button>
              <FontAwesomeIcon icon={faBrush} />
            </button>
          </Navigation_Button>
          <Navigation_Button
            className="theme-btn"
            onClick={() => handleChangeLang(i18n)}
          >
            <button>
              <FontAwesomeIcon icon={faLanguage} />
            </button>
          </Navigation_Button>
          <Navigation_Button className="theme-btn">
            <button>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </Navigation_Button>
          <Navigation_Button className="theme-btn">
            <button>
              <FontAwesomeIcon icon={faCircleInfo} />
            </button>
          </Navigation_Button>

          <Navigation_Button
            className="theme-btn"
            onClick={() => setIsList(!isList)}
          >
            <button>
              <FontAwesomeIcon icon={faList} />
            </button>
          </Navigation_Button>
        </Buttons_List>
      </Styled_Navbar>
    </Holder>
  );
};

export default ActionsNavbar;
