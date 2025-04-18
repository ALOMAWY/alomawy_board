import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Styled_Name = styled.h3`
  font-family: "Noto Sans", sans-serif;
  color: transparent;
  font-size: 1.5rem;
  text-transform: uppercase;
  z-index: 21;
  overflow: hidden;
  -webkit-text-stroke: 1px var(--main-color);
  letter-spacing: 3px;
  border-right: 1px solid var(--background-white-color);
  overflow: hidden;
  white-space: nowrap;
  font-size: 1rem;
  direction: ltr;
  //   animation: typing 5s steps(14) infinite forwards, blink 1s step-end infinite;
`;

const Name = () => {
  const [name, setName] = useState<string>("ALOMAWY");
  const names: string[] = ["Developer", "PUBGER", "Youtuber", "ALOMAWY"];

  setTimeout(() => {
    const nextName =
      names.indexOf(name) + 1 < names.length ? names.indexOf(name) + 1 : 0;

    setName(names[nextName]);
  }, 5000);

  return (
    <Link to="/">
      <div style={{ width: "fit-content", padding: "1rem" }}>
        <Styled_Name
          style={{
            animation: ` typing 5s steps(${
              name.length * 2
            }) infinite forwards, blink 1s step-end infinite`,
          }}
        >
          {name}
        </Styled_Name>
      </div>
    </Link>
  );
};

export default Name;
