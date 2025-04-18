import styled from "styled-components";
import { useMyContext } from "./Context";
import { Navigation_Button } from "./ActionsNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrush,
  faCircleInfo,
  faDownload,
  faLanguage,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { handleChangeLang, handleChangeTheme } from "../utils";
import { getItemFromLocalStorage } from "../utils/localStorage";

const Styled_Menu = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--background-main-color);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(6px);

  .close-btn {
    position: absolute;
    top: 10%;
    right: 10%;
    z-index: 2;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 2rem;
    flex-direction: column;
    height: 60vh;
  }
`;

const Menu = () => {
  const { isList, isOpen, setIsOpen } = useMyContext();

  const { i18n, t } = useTranslation();
  return (
    <Styled_Menu
      style={{ display: isOpen ? "flex" : "none" }}
      className={isList ? "translate-x-r" : "translate-x-l"}
    >
      <button className="close-btn" onClick={() => setIsOpen(false)}>
        <FontAwesomeIcon icon={faXmark} size="2x" />
      </button>

      {isList ? (
        <ul onClick={() => setIsOpen(false)}>
          <Navigation_Button className={isList ? "translate-x-r-1" : ""}>
            <Link to="/">{t("sections.home")}</Link>
          </Navigation_Button>
          <Navigation_Button className={isList ? "translate-x-r-1" : ""}>
            <Link to="/services">{t("sections.services")}</Link>
          </Navigation_Button>
          <Navigation_Button className={isList ? "translate-x-r-2" : ""}>
            <Link to="/portfolio">{t("sections.portfolio")}</Link>
          </Navigation_Button>
          <Navigation_Button className={isList ? "translate-x-r-3" : ""}>
            <Link to="/contact_us">{t("sections.contact_us")}</Link>
          </Navigation_Button>
          <Navigation_Button className={isList ? "translate-x-r-4" : ""}>
            <Link to="/about_us">{t("sections.about_us")}</Link>
          </Navigation_Button>
          <Navigation_Button className={isList ? "translate-x-r-5" : ""}>
            <Link to="/social_media">{t("sections.social_media")}</Link>
          </Navigation_Button>
        </ul>
      ) : (
        <ul>
          <Navigation_Button
            className="translate-x-l-1"
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
            className="translate-x-l-2"
            onClick={() => {
              handleChangeLang(i18n);
            }}
          >
            <button>
              <FontAwesomeIcon icon={faLanguage} />
            </button>
          </Navigation_Button>
          <Navigation_Button className="translate-x-l-3">
            <button>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </Navigation_Button>
          <Navigation_Button className="translate-x-l-4">
            <button>
              <FontAwesomeIcon icon={faCircleInfo} />
            </button>
          </Navigation_Button>
        </ul>
      )}
    </Styled_Menu>
  );
};

export default Menu;
