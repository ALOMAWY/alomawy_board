import {
  faAt,
  faChessPawn,
  faCode,
  faEye,
  faImage,
  faLanguage,
  faPen,
  faPenToSquare,
  faServer,
  faSignature,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  addDoc,
  collection,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { db } from "../lib/firebase";
import { upload } from "../lib/upload";
import Portfolio from "./Portfolio";

const Styled_Form = styled.form`
  margin: 1rem 0 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px dashed var(--main-color);
  backdrop-filter: blur(10px);
  background-color: #00000061;
  box-shadow: 0 0 16px -3px var(--background-main-color);

  .input {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    position: relative;
    border: 1px solid var(--main-color);
    border-style: dashed dashed dashed solid;
    border-radius: 0;
    overflow: hidden;

    &:has(.techs) .techs,
    &:has(.types) .types {
      padding-left: 10px;
      height: auto;
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      width: 100%;

      > div {
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 5px;
        width: 15%;

        @media (max-width: 1000px) {
          width: 20%;
        }

        @media (max-width: 700px) {
          width: 25%;
        }

        @media (max-width: 570px) {
          width: 40%;
        }

        input {
          width: fit-content;
        }

        label {
          width: fit-content;
          color: #fff;
        }
      }
    }
    .arabic,
    .english {
      display: flex;
      width: 30%;
      margin-left: 15%;
      gap: 10px;

      input {
        width: fit-content;
      }

      label {
        width: fit-content;
        color: #fff;
      }
    }

    &:has(label + textarea) label {
      margin-bottom: auto;
      margin-top: 7px;
    }

    label {
      width: 20px;

      svg {
        color: var(--main-color);
        margin: 5px;
      }
    }

    input,
    textarea {
      padding: 10px;
      width: 100%;
      background: transparent;
      color: var(--secondary-color);
      font-weight: normal;
      text-transform: none;
      resize: none;

      &::placeholder {
        color: var(--secondary-color);
        font-weight: normal;
      }
    }
  }
  button {
    padding: 10px;
    position: relative;
    border: 1px solid var(--main-color);
    border-style: dashed dashed dashed solid;
    border-radius: 0;
    overflow: hidden;
    font-weight: normal;

    &:hover {
      color: var(--main-color);
    }
  }
`;

const Dashboard = () => {
  const { t } = useTranslation();
  const [image, setImage] = useState<{ file: null | File; url: unknown }>({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageURL = await upload(file);

        setImage({
          file: file,
          url: imageURL,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const technologies = [
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "redux",
    "sass",
    "bootstrap",
    "tailwind",
    "vite",
    "webpack",
    "gulp",
    "eslint",
    "prettier",
    "nextjs",
    "axios",
    "formik",
    "yup",
    "reactRouter",
    "firebase",
    "zustand",
  ];

  const languages = ["arabic", "english"];

  const [range, setRange] = useState("0");
  const [type, setType] = useState("website");
  const [techs, setTechs] = useState<string[]>(["html", "css", "javascript"]);
  const [langs, setLangs] = useState<string[]>(["english"]);

  const [projectData, setProjectData] = useState({
    title: "",
    developer: "",
    source: "",
    visit: "",
    disc: "",
    rate: range,
    image: image.url,
    langs,
    techs,
    type,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (technologies.includes(name)) {
      if (e.target.checked) {
        const newTechs: string[] = [...techs, name];
        setTechs(newTechs);
      } else {
        const newTechs = techs.filter((e) => e !== name);
        setTechs(newTechs);
      }
    } else if (languages.includes(name)) {
      if (e.target.checked) {
        const newLangs: string[] = [...langs, name];
        setLangs(newLangs);
      } else {
        const newLangs = langs.filter((e) => e !== name);
        setLangs(newLangs);
      }
    } else if (name == "type") {
      setType(e.target.value);
      console.log(e.target.value);
      console.log(e);
    } else {
      setProjectData((prev) => ({ ...prev, [name]: value }));
    }
    setProjectData((prev) => ({
      ...prev,
      langs,
      rate: range,
      image: image.url,
      techs,
      type,
    }));
  };

  const handleRange = (e) => {
    setRange(e.target.value);

    setProjectData((prev) => ({ ...prev, rate: range }));
  };

  useEffect(() => {
    console.log(projectData);
  });

  const handleAdd = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...projectData,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <div>
      <Styled_Form onSubmit={handleAdd}>
        <div className="input">
          <label htmlFor="title">
            <FontAwesomeIcon icon={faSignature} />
          </label>
          <input
            type="text"
            placeholder={t("dashboard.projectName")}
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="developer">
            <FontAwesomeIcon icon={faAt} />
          </label>
          <input
            type="text"
            placeholder={t("dashboard.developerName")}
            name="developer"
            id="developer"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="source">
            <FontAwesomeIcon icon={faPen} />
          </label>
          <input
            type="text"
            placeholder={t("dashboard.idea_source")}
            id="source"
            name="source"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="visit">
            <FontAwesomeIcon icon={faEye} />
          </label>
          <input
            type="url"
            placeholder={t("dashboard.visit_link")}
            id="visit"
            name="visit"
            onChange={handleChange}
          />
        </div>
        <div className="input">
          <label htmlFor="description">
            <FontAwesomeIcon icon={faPenToSquare} />
          </label>
          <input
            placeholder={t("dashboard.disc")}
            id="description"
            name="disc"
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <label htmlFor="type">
            <FontAwesomeIcon icon={faChessPawn} />
          </label>

          <div className="types">
            <div className="type">
              <label htmlFor="website">Website</label>
              <input
                type="radio"
                onChange={handleChange}
                name="type"
                id="website"
                value="website"
                checked={type == "website"}
              />
            </div>

            <div className="type">
              <label htmlFor="game">Game</label>
              <input
                type="radio"
                onChange={handleChange}
                name="type"
                id="game"
                value="game"
                checked={type == "game"}
              />
            </div>

            <div className="type">
              <label htmlFor="simple">Simple</label>
              <input
                type="radio"
                onChange={handleChange}
                name="type"
                id="simple"
                value="simple"
                checked={type == "simple"}
              />
            </div>

            <div className="type">
              <label htmlFor="other">Others</label>
              <input
                type="radio"
                onChange={handleChange}
                name="type"
                id="other"
                value="other"
                checked={type == "other"}
              />
            </div>
          </div>
        </div>
        <div className="input">
          <label htmlFor="technologies">
            <FontAwesomeIcon icon={faCode} />
          </label>
          <div className="techs">
            <div className="tech">
              <label htmlFor="html">HTML</label>
              <input
                type="checkbox"
                name="html"
                id="html"
                onChange={handleChange}
                checked={techs.includes("html")}
              />
            </div>
            <div className="tech">
              <label htmlFor="css">CSS</label>
              <input
                type="checkbox"
                name="css"
                id="css"
                onChange={handleChange}
                checked={techs.includes("css")}
              />
            </div>
            <div className="tech">
              <label htmlFor="javascript">JavaScript</label>
              <input
                type="checkbox"
                name="javascript"
                id="javascript"
                onChange={handleChange}
                checked={techs.includes("javascript")}
              />
            </div>
            <div className="tech">
              <label htmlFor="typescript">TypeScript</label>
              <input
                type="checkbox"
                name="typescript"
                onChange={handleChange}
                id="typescript"
              />
            </div>
            <div className="tech">
              <label htmlFor="react">React</label>
              <input
                type="checkbox"
                name="react"
                onChange={handleChange}
                id="react"
              />
            </div>
            <div className="tech">
              <label htmlFor="redux">Redux</label>
              <input
                type="checkbox"
                name="redux"
                onChange={handleChange}
                id="redux"
              />
            </div>
            <div className="tech">
              <label htmlFor="sass">Sass</label>
              <input
                type="checkbox"
                name="sass"
                onChange={handleChange}
                id="sass"
              />
            </div>
            <div className="tech">
              <label htmlFor="bootstrap">Bootstrap</label>
              <input
                type="checkbox"
                name="bootstrap"
                onChange={handleChange}
                id="bootstrap"
              />
            </div>
            <div className="tech">
              <label htmlFor="tailwind">Tailwind CSS</label>
              <input
                type="checkbox"
                name="tailwind"
                onChange={handleChange}
                id="tailwind"
              />
            </div>
            <div className="tech">
              <label htmlFor="vite">Vite</label>
              <input
                type="checkbox"
                name="vite"
                onChange={handleChange}
                id="vite"
              />
            </div>
            <div className="tech">
              <label htmlFor="webpack">Webpack</label>
              <input
                type="checkbox"
                name="webpack"
                onChange={handleChange}
                id="webpack"
              />
            </div>
            <div className="tech">
              <label htmlFor="gulp">Gulp</label>
              <input
                type="checkbox"
                name="gulp"
                onChange={handleChange}
                id="gulp"
              />
            </div>
            <div className="tech">
              <label htmlFor="eslint">ESLint</label>
              <input
                type="checkbox"
                name="eslint"
                onChange={handleChange}
                id="eslint"
              />
            </div>
            <div className="tech">
              <label htmlFor="prettier">Prettier</label>
              <input
                type="checkbox"
                name="prettier"
                onChange={handleChange}
                id="prettier"
              />
            </div>
            <div className="tech">
              <label htmlFor="nextjs">Next.js</label>
              <input
                type="checkbox"
                name="nextjs"
                onChange={handleChange}
                id="nextjs"
              />
            </div>
            <div className="tech">
              <label htmlFor="axios">Axios</label>
              <input
                type="checkbox"
                name="axios"
                onChange={handleChange}
                id="axios"
              />
            </div>
            <div className="tech">
              <label htmlFor="formik">Formik</label>
              <input
                type="checkbox"
                name="formik"
                onChange={handleChange}
                id="formik"
              />
            </div>
            <div className="tech">
              <label htmlFor="yup">Yup</label>
              <input
                type="checkbox"
                name="yup"
                onChange={handleChange}
                id="yup"
              />
            </div>
            <div className="tech">
              <label htmlFor="reactRouter">React Router</label>
              <input
                type="checkbox"
                name="reactRouter"
                onChange={handleChange}
                id="reactRouter"
              />
            </div>
            <div className="tech">
              <label htmlFor="firebase">Firebase</label>
              <input
                type="checkbox"
                name="firebase"
                onChange={handleChange}
                id="firebase"
              />
            </div>
            <div className="tech">
              <label htmlFor="zustand">Zustand</label>
              <input
                type="checkbox"
                name="zustand"
                onChange={handleChange}
                id="zustand"
              />
            </div>
          </div>
        </div>
        <div className="input">
          <label htmlFor="language">
            <FontAwesomeIcon icon={faLanguage} />
          </label>

          <div className="arabic">
            <label htmlFor="arabic">Arabic</label>
            <input
              type="checkbox"
              name="arabic"
              onChange={handleChange}
              id="arabic"
            />
          </div>
          <div className="english">
            <label htmlFor="english">English</label>
            <input
              type="checkbox"
              name="english"
              onChange={handleChange}
              id="english"
              checked={langs.includes("english")}
            />
          </div>
        </div>
        <div className="input">
          <label htmlFor="rate">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="range"
            name="range"
            placeholder={t("dashboard.rate")}
            id="rate"
            style={{ opacity: "0", height: "50px" }}
            onChange={handleRange}
          />
          <div
            style={{
              width: "80%",
              height: "10px",
              left: "10%",
              backgroundColor: "white",
              position: "absolute",
              zIndex: "-1",
            }}
          >
            <div
              style={{
                width: range + "%",
                height: "100%",
                background:
                  +range > 75
                    ? "green"
                    : +range > 50
                    ? "red"
                    : +range > 25
                    ? "purple"
                    : "blue",
              }}
            ></div>
          </div>
        </div>
        <div className="input">
          <label
            htmlFor="image"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <FontAwesomeIcon icon={faImage} />
            <span
              style={{
                color: "var(--main-color)",
                width: "fit-content",
                textDecoration: "underline",
              }}
            >
              {t("dashboard.select_image_here")}
            </span>
          </label>
          <img
            src={image.url || "./template_images/degital-graphy.png"}
            alt="Image"
            style={{ width: "200px", height: "100px" }}
          />
          <input
            style={{ display: "none" }}
            type="file"
            placeholder="Image URL"
            id="image"
            required
            onChange={handleImage}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? t("info.loading") + "..." : t("dashboard.add")}
        </button>
      </Styled_Form>
      <>
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            margin: "2rem",
            textTransform: "uppercase",
          }}
        >
          Projects
        </h1>
        <Portfolio />
      </>
    </div>
  );
};

export default Dashboard;
