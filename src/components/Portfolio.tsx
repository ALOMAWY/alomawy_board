import { collection,  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Styled_Portfolio = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  gap: 1rem;
  place-items: center;
  margin: 2rem 0;
`;

const Portfolio = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const handleFetchingData = async () => {
    try {
      const quarySnapshot = await getDocs(collection(db, "projects"));

      const data: ProjectData[] = [];

      quarySnapshot.forEach((e) => data.push(e.data() as ProjectData));

      setProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchingData();
  }, []);

  return (
    <Styled_Portfolio>
      {projects && projects.map((project) => <Card project={project} />)}
    </Styled_Portfolio>
  );
};

interface ProjectData {
  title: string;
  image: string;
  developer: string;
  type: string;
  source: string;
  disc: string;
  techs: string[];
  langs: string[];
  rate: string;
  visit: string;
}
interface cardProps {
  project: ProjectData;
}

const Rate = ({ rate, color }: { rate: string; color: string }) => {
  const rateFrom5: number = +rate / 20;

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span>
          <FontAwesomeIcon
            icon={faStar}
            color={star < rateFrom5 ? color : color + "40"}
          />
        </span>
      ))}
    </div>
  );
};

const Card = ({ project }: cardProps) => {
  const { t } = useTranslation();

  const {
    title,
    image,
    developer,
    type,
    source,
    disc,
    techs,
    langs,
    rate,
    visit,
  } = project;

  let color: string = "";

  switch (type) {
    case "website":
      color = "#186ca4";
      break;

    case "game":
      color = "#673ab7";

      break;

    case "simple":
      color = "#51ad24";
      break;

    case "simple":
      color = "#ff9800";
      break;

    default:
      color = "#186ca4";
      break;
  }

  const StyledCard = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid;
    color: #fff;
    backdrop-filter: blur(6px);
    background: ${color}30;
    border-color: ${color};
    text-shadow: ${color} 0 0 10px;
    border-radius: 5px;
    box-shadow: 0 0 20px 1px ${color};

    &:hover {
      scale: 1.05;
    }

    @media (max-width: 991px) {
      width: 90%;
    }

    h1 {
      font-size: 1.2rem;
      margin: 15px;
    }

    .image {
      width: 80%;
      margin: 15px auto;

      img {
        width: 100%;
        aspect-ratio: 16 / 9;
        border: 1px solid #ffffff50;
        border-radius: 20px;
      }
    }

    .infos {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      & .info {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 10px;
        background: #00000035;

        span {
          width: 50%;
        }

        .scroll {
          padding-bottom: 5px;
          overflow-x: auto;
          white-space: nowrap;
          text-transform: uppercase;

          span {
            text-transform: uppercase;
          }
        }
      }
    }

    .visit {
      display: block;
      width: 50%;
      text-align: center;
      border: 1px dashed ${color};
      border-radius: 20px;
      padding: 10px;
      margin: 1rem auto;

      &:hover {
        background: ${color}40;
        button {
          letter-spacing: 5px;
        }
      }
    }
  `;

  return (
    <StyledCard>
      <h1>{title}</h1>
      <div className="image">
        <img src={image} alt="Project" />
      </div>

      <div className="infos">
        <div className="info">
          <span>{t("portfolio.developer")}</span>
          <span>{developer}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.type")}</span>
          <span>{type}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.source")}</span>
          <span>{source}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.disc")}</span>
          <span className="scroll">{disc}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.techs")}</span>
          <span className="itrable scroll">
            {techs.map((e) => (
              <span> {e} ,</span>
            ))}
          </span>
        </div>

        <div className="info">
          <span>{t("portfolio.langs")}</span>
          <div className="itrable scroll">
            {langs.map((e) => (
              <span> {e} </span>
            ))}
          </div>
        </div>

        <div className="info">
          <span>{t("portfolio.rate")}</span>
          <span>
            <Rate rate={rate} color={color} />
          </span>
        </div>
      </div>

      <a href={visit} className="visit">
        <button>Visit</button>
      </a>
    </StyledCard>
  );
};

export default Portfolio;
