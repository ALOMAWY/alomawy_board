import styled from "styled-components";
import { Navigation_Button } from "./ActionsNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useMyContext } from "./Context";
import { useTranslation } from "react-i18next";

const Styled_LinksNavbar = styled.nav`
  width: 100%;
`;
const Styled_LinksList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  overflow: hidden;
  border-bottom: 1px solid var(--main-color);

  li {
    color: #fff;
  }
`;

const LinksNavbar = () => {
  const { isList, setIsList, setIsOpen } = useMyContext();
  const { t } = useTranslation();

  return (
    <Styled_LinksNavbar className={isList ? "translate-x-r" : ""}>
      <Styled_LinksList onClick={() => setIsOpen(false)}>
        <Navigation_Button>
          <Link to="/">{t("sections.home")}</Link>
        </Navigation_Button>
        <Navigation_Button>
          <Link to="/services">{t("sections.services")}</Link>
        </Navigation_Button>
        <Navigation_Button>
          <Link to="/portfolio">{t("sections.portfolio")}</Link>
        </Navigation_Button>
        <Navigation_Button>
          <Link to="/contact_us">{t("sections.contact_us")}</Link>
        </Navigation_Button>
        <Navigation_Button>
          <Link to="/about_us">{t("sections.about_us")}</Link>
        </Navigation_Button>
        <Navigation_Button>
          <Link to="/social_media">{t("sections.social_media")}</Link>
        </Navigation_Button>
        <Navigation_Button
          className="theme-btn"
          onClick={() => setIsList(!isList)}
        >
          <button>
            <FontAwesomeIcon icon={faList} />
          </button>
        </Navigation_Button>
      </Styled_LinksList>
    </Styled_LinksNavbar>
  );
};

export default LinksNavbar;
