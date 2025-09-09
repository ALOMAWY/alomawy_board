import { collection, getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useMyContext } from "./Context";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const Styled_Portfolio = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(calc((100% / 3) - 1rem), calc(100% / 3 - 1rem))
  );
  position: relative;
  justify-content: center;

  @media (max-width: 991px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc((100% / 2) - 1rem), calc(100% / 2 - 1rem))
    );
  }

  @media (max-width: 668px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc((100% / 1) - 1rem), calc(100% / 1 - 1rem))
    );
  }

  gap: 1rem;
  margin: 2rem 0;
`;

const Categories = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  gap: 2rem;
  color: #fff;
  width: fit-content;
  background: #00000035;
  backdrop-filter: blur(10px);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  margin: 0 auto;

  @media (max-width: 991px) {
    width: 100%;
    gap: 1rem;
  }

  @media (max-width: 485px) {
    flex-wrap: wrap;
    gap: 1rem;  

}


  .category {
    cursor: pointer;
    background: #00000035;
    border-radius: 5px;
    padding: 10px;
    font-size: 1rem;
    position: relative;
text-shadow: var(--main-color) -2px -2px 10px ;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background: var(--background-main-color);
      z-index: -1;
      border-radius: 5px;
      transition: 0.3s;
      
    }

    &:hover::before {
      
      width: 100%;
  }
`;

const NoItemsMessage = styled.h1`
  width: fit-content;
  color: #fff;
  text-align: center;
  margin: 3rem 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #00000035;
  border-radius: 10px;
  border: 1px solid var(--main-color);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px 1px var(--main-color);
  padding: 5rem;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const Portfolio = () => {
  const { newProject } = useMyContext();
  const { t } = useTranslation();

  const [projects, setProjects] = useState<ProjectData[]>([]);

  const [category, setCategory] = useState<string>("all");

  const categories = [
    { text: t("portfolio.category.all"), value: "all" },
    { text: t("portfolio.category.website"), value: "website" },
    { text: t("portfolio.category.game"), value: "game" },
    { text: t("portfolio.category.simple"), value: "simple" },
    { text: t("portfolio.category.dashboard"), value: "dashboard" },
    { text: t("portfolio.category.app"), value: "app" },
  ];

  const filterdProjects = useMemo(() => {
    if (category === "all") {
      return projects;
    } else {
      return projects.filter((pr) => pr.type == category);
    }
  }, [category, projects]);

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
  }, [newProject]);

  return (
    <div style={{ minHeight: "calc(100vh - 130px)" }}>
      <Categories className="categories">
        {categories.map((cate) => (
          <div
            key={cate.value}
            className="category"
            style={{
              background: category == cate.value ? "var(--main-color)" : "",
            }}
            onClick={() => setCategory(cate.value)}
          >
            {cate.text}
          </div>
        ))}
        <div
          className="category"
          style={{
            borderRadius: 0,
            paddingRight: " 1rem",
            paddingLeft: " 1rem",
            borderLeft: "3px solid var(--main-color)",
          }}
        >
          {filterdProjects.length < 9 ? 0 : ""}
          {filterdProjects.length}
        </div>
      </Categories>
      <Styled_Portfolio>
        {filterdProjects.length ? (
          filterdProjects.map((project) => (
            <Card key={project.disc} project={project} />
          ))
        ) : (
          <NoItemsMessage>
            {t("portfolio.no_projects_with_category", { category })}
          </NoItemsMessage>
        )}
      </Styled_Portfolio>
    </div>
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
        <span key={star}>
          <FontAwesomeIcon
            icon={faStar}
            color={star < rateFrom5 || star == 1 ? color : color + "40"}
          />
        </span>
      ))}
    </div>
  );
};
const StyledCard = styled.div`
  width: 100%;
  border: 1px solid;
  color: #fff;
  backdrop-filter: blur(6px);
  border-radius: 5px;

  &:hover {
    scale: 1.02;
  }

  @media (max-width: 991px) {
    width: 90%;
    margin: 0 auto;
  }

  h1 {
    font-size: 1.2rem;
    margin: 15px;
    text-transform: uppercase;
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
    gap: 0.5rem;

    & .info {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px;
      background: #00000035;

      span {
        &:nth-child(1) {
          width: 38%;
        }
        &:nth-child(2) {
          width: 62%;
        }
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

    border-radius: 20px;
    padding: 10px;
    margin: 1rem auto;

    &:hover {
      opactiy: 0.5;
      button {
        letter-spacing: 5px;
      }
    }
  }
`;
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

    case "dashboard":
      color = "#ff9800";
      break;

    case "app":
      color = "#9c27b0";
      break;

    default:
      color = "#186ca4";
      break;
  }

  return (
    <StyledCard
      style={{
        boxShadow: `0 0 20px 1px ${color}`,
        background: color + "30",
        borderColor: color,
        textShadow: ` ${color} 0 0 10px`,
      }}
    >
      <h1>{title}</h1>
      <div className="image">
        <img src={image && "./assets/project-placeholder.png"} alt="Project" />
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
          <span className="itrable scroll">{source}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.disc")}</span>
          <span className="scroll">{disc}</span>
        </div>

        <div className="info">
          <span>{t("portfolio.techs")}</span>
          <span className="itrable scroll">
            {techs.map((e) => (
              <span key={e}> {e} ,</span>
            ))}
          </span>
        </div>

        <div className="info">
          <span>{t("portfolio.langs")}</span>
          <div className="itrable scroll">
            {langs.map((e) => (
              <span key={e}> {e} </span>
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

      <a
        href={visit}
        style={{ border: `1px dashed ${color}` }}
        className="visit"
      >
        <button>Visit</button>
      </a>
    </StyledCard>
  );
};

export default Portfolio;
