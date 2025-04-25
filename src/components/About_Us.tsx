import {
  faBriefcase,
  faChartSimple,
  faDiagramProject,
  faDumbbell,
  faHeartPulse,
  faMapPin,
  faShieldHeart,
  faSignature,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { calculate } from "../utils";

const Styled_About_Us = styled.div`
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  .info-box {
    flex: 1;
    background: var(--background-main-color);
    max-width: 50%;
    border-radius: 20px;
    border: 1px dashed var(--background-main-color);
    box-shadow: 0 0 42px -5px var(--main-color);
    border: 1px solid var(--main-color);
    backdrop-filter: blur(3px);

    @media (max-width: 800px) {
      max-width: 100%;
    }

    > div {
      display: flex;
      padding: 1rem;
      align-items: center;
      gap: 1rem;

      &:not(:last-child) {
        border-bottom: 1px solid #fff;
      }

      > div:first-child {
        width: 200px;
        max-width: 40%;

        span {
          margin: 0 0.4rem;
          width: 100%;
        }
      }
    }
  }
`;

const AnimationArea = styled.div`
  width: 20vw;
  height: 20vw;
  position: relative;

  @media (max-width: 800px) {
    width: 80vw;
    height: 80vw;
  }

  .animation-ball {
    width: 60%;
    height: 60%;
    background-image: linear-gradient(
      120deg,
      var(--main-color),
      var(--background-main-color)
    );
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;
    box-shadow: 0 0 20px var(--background-main-color);
    animation: ball-animation 20s linear infinite forwards;
  }

  @keyframes ball-animation {
    0%,
    100% {
      border-radius: 50% 50% 50% 50% /50% 50% 50% 50%;
    }
    10% {
      border-radius: 30% 20% 70% 10% /50% 80% 20% 10%;
    }
    20% {
      border-radius: 20% 30% 80% 30% /60% 30% 40% 80%;
      scale: 1.06;
    }
    30% {
      border-radius: 50% 80% 10% 70% /20% 90% 80% 20%;
      transform: translate(-50%, -50%) rotate(360deg);
    }
    40% {
      border-radius: 90% 20% 50% 10% /70% 30% 10% 90%;
    }
    50% {
      scale: 0.6;
      border-radius: 30% 60% 10% 51% /35% 60% 70% 20%;
    }
    60% {
      border-radius: 90% 40% 90% 30% /75% 20% 70% 0%;
      transform: translate(-50%, -50%) rotate(0deg);
    }
    70% {
      border-radius: 10% 80% 30% 80% /45% 30% 30% 50%;
    }
    80% {
      scale: 1;
      border-radius: 50% 80% 70% 60% /90% 90% 40% 90%;
    }
    90% {
      border-radius: 10% 90% 10% 80% /90% 30% 70% 80%;
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const About_Us = () => {
  const { t } = useTranslation();

  const skills: string[] = [
    "HTML",
    "CSS",
    "SASS",
    "TYPESCRIPT",
    "JAVASCRIPT",
    "React-JS",
    "Next-JS",
    "Tailwend",
    "BOOTSTRAP",
    "GITHUB & GIT",
  ];

  return (
    <Styled_About_Us>
      <div className="info-box">
        <div className="name">
          <div>
            <span>
              <FontAwesomeIcon icon={faSignature} />
            </span>
            <span>{t("about.fullname")}</span>
          </div>
          <span>{t("info.fullname")}</span>
        </div>

        <div className="age">
          <div>
            <span>
              <FontAwesomeIcon icon={faHeartPulse} />
            </span>
            <span>{t("about.age")}</span>
          </div>
          <p>{calculate("2006-06-22")}</p>
        </div>

        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faShieldHeart} />
            </span>
            <span>{t("about.marital_status")}</span>
          </div>
          <span>{t("about.marital_status_now")}</span>
        </div>

        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faBriefcase} />
            </span>
            <span>{t("about.work")}</span>
          </div>
          <span>{t("about.work_now")}</span>
        </div>
        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faMapPin} />
            </span>
            <span>{t("about.position")}</span>
          </div>
          <span>{t("about.position_now")}</span>
        </div>
        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faDiagramProject} />
            </span>
            <span>{t("about.status")}</span>
          </div>
          <span>{t("about.status_now")}</span>
        </div>
        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faChartSimple} />
            </span>
            <span>{t("about.exp")}</span>
          </div>
          <span>{calculate("2021-01-04")}</span>
        </div>

        <div>
          <div>
            <span>
              <FontAwesomeIcon icon={faDumbbell} />
            </span>
            <span>{t("about.skills")}</span>
          </div>
          <div
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              display: "flex",
              alignItems: "center",
              width: "70%",
              padding: "10px",
            }}
          >
            {skills &&
              skills.map((skill) => (
                <span
                  style={{
                    margin: "0 10px 0 0",
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px dashed var(--main-color)",
                    whiteSpace: "nowrap",
                    fontSize: "0.6rem",
                  }}
                >
                  {skill}
                </span>
              ))}
          </div>
        </div>
      </div>

      <AnimationArea className="animation-area">
        <div className="animation-ball b-blur"></div>
      </AnimationArea>
    </Styled_About_Us>
  );
};

export default About_Us;
