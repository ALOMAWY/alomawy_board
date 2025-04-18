import styled from "styled-components";

import ActionsNavbar from "./ActionsNavbar";
import { useMyContext } from "./Context";
import LinksNavbar from "./LinksNavbar";
import Name from "./Name";
import PagesSelect from "./PagesSelect";
import ActionSelect from "./ActionSelect";

const Mobile_Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--secondary-color);
`;

const Header = () => {
  const { isList, isMobile } = useMyContext();
  return (
    <header>
      {isMobile ? (
        <Mobile_Header>
          <Name />

          <div style={{ display: "flex", gap: "1rem" }}>
            <ActionSelect />
            <PagesSelect />
          </div>
        </Mobile_Header>
      ) : (
        <div>{isList ? <LinksNavbar /> : <ActionsNavbar />}</div>
      )}
    </header>
  );
};

export default Header;
