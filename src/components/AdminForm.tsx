import { faKey, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { signRejected, signResolved } from "../redux/adminSign";
import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Styled_Form = styled.form`
  max-width: 500px;
  margin:auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap:1rem;
  padding: 1rem;
  border: 1px dashed var(--main-color);
  backdrop-filter: blur(10px);
  background-color: #00000061;
  box-shadow: 0 0 16px -3px var(--background-main-color);


h1{
color:#fff;
margin: 3rem auto;
}

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
  }
  }
`;

const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

const AdminForm = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleSign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const { email, password } = Object.fromEntries(formData);

    setLoading(true);

    try {
      if (email == adminEmail && password == adminPassword) {
        return dispatch(signResolved());
      } else {
        return dispatch(signRejected());
      }
    } catch (error) {
      console.error(error);

      dispatch(signRejected());
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <Styled_Form onSubmit={handleSign}>
        <h1>{t("admin.ask")}</h1>
        <div className="input">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faUserTie} />
          </label>
          <input
            type="text"
            placeholder={t("admin.placeholder.email")}
            id="email"
            name="email"
            required
          />
        </div>
        <div className="input">
          <label htmlFor="adminPass">
            <FontAwesomeIcon icon={faKey} />
          </label>
          <input
            type="password"
            name="password"
            placeholder={t("admin.placeholder.pass")}
            id="adminPass"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? t("info.loading") : t("admin.sign")}
        </button>
      </Styled_Form>
    </div>
  );
};

export default AdminForm;
