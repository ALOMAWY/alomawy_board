import {
  faComment,
  faCommentSms,
  faEnvelope,
  faGears,
  faGlobe,
  faHeart,
  faLaptop,
  faLocationDot,
  faMessage,
  faMobileScreen,
  faStar,
  faUser,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Styled_Contact_Us = styled.div`
  height: 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 50px;

  @media (max-width: 1040px) {
    flex-direction: column-reverse;
  }
`;

const DrawContainer = styled.div`
  flex: 1;
  max-width: 500px;
  max-width: 500px;

  .circle {
    width: 500px;
    height: 500px;
    position: relative;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 10px #766e6e;
      border: 3px solid transparent;
      transition: 0.3s;

      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        z-index: 12321311;
        border-color: var(--main-color);
      }
    }

    .text {
      width: 55%;
      height: 55%;
      background-color: var(--secondary-color);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      right: -20%;
      bottom: -8%;
      z-index: 8;
      i {
        font-size: 150%;
        transform: translateY(-60%);
      }
      span {
        font-size: 100%;
        font-weight: 600;
      }
    }
    .c-c {
      width: 30%;
      height: 30%;
      background-color: var(--main-color);
      border-radius: 50%;
      i {
        font-size: 100%;
        color: var(--secondary-color);
      }
    }
    .c-w {
      width: 15%;
      height: 15%;
      background-color: var(--secondary-color);
      border-radius: 50%;
      i {
        font-size: 100%;
        color: var(--main-color);
      }
    }
    .location {
      top: 50%;
      left: 8%;
      z-index: 1;
    }
    .star-1 {
      top: 20%;
      left: 35%;
      z-index: 2;
    }
    .phone {
      top: 66%;
      left: 30%;
    }
    .internet {
      left: 35%;
      top: 38%;
    }
    .email {
      left: 55%;
      top: 20%;
    }
    .star {
      top: 80%;
      left: 50%;
    }
    .setting {
      left: 75%;
      top: 23%;
      z-index: 3;
    }
    .wifi {
      left: 23%;
      top: 35%;
    }
    .love {
      left: 87%;
      top: 16%;
    }
    .sms {
      top: 80%;
      left: 80%;
      background-color: var(--main-color);
      z-index: 7;
      i {
        color: var(--secondary-color);
      }
    }
    .massage {
      top: 80%;
      z-index: 4;
      left: 20%;
    }

    @media (max-width: 550px) {
      width: 400px;
      height: 400px;
    }
    @media (max-width: 450px) {
      width: 300px;
      height: 300px;
    }
  }
  @media (max-width: 550px) {
    max-width: 400px;
    max-height: 400px;
  }
  @media (max-width: 450px) {
    max-width: 300px;
    max-height: 300px;
  }
`;

const ContactForm = styled.form`
  max-width: 600px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
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
`;

const Contact_Us = () => {
  const { t } = useTranslation();

  const drawContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (drawContainerRef.current) {
    }
  });

  return (
    <Styled_Contact_Us>
      <ContactForm>
        <div className="input">
          <label htmlFor="name">
            <FontAwesomeIcon icon={faUser} />
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("form.placeholder.name")}
            name="name"
            min="3"
            max="15"
            required
          />
        </div>
        <div className="input">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} />
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("form.placeholder.email")}
            required
            name="email"
          />
        </div>
        <div className="input">
          <label htmlFor="massege-area">
            <FontAwesomeIcon icon={faComment} />
          </label>
          <textarea
            name="masseage"
            id="massage-area"
            placeholder={t("form.placeholder.massege")}
            cols={30}
            rows={7}
            minLength={10}
            maxLength={500}
            required
          ></textarea>
        </div>
        <button type="submit" id="send-massage">
          {t("form.send")}
        </button>
      </ContactForm>
      <DrawContainer>
        <div className="circle">
          <div className="text">
            <FontAwesomeIcon icon={faLaptop} />
            <span data-lang="contactUsPopup">Contact Us</span>
          </div>
          <div className="star-1 c-w">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="wifi c-c">
            <FontAwesomeIcon icon={faWifi} />
          </div>
          <div className="massage c-w">
            <FontAwesomeIcon icon={faMessage} />
          </div>
          <div className="sms c-w">
            <FontAwesomeIcon icon={faCommentSms} />
          </div>
          <div className="internet c-w">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
          <div className="location c-w">
            <FontAwesomeIcon icon={faLocationDot} />
          </div>
          <div className="star c-w">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="love c-w">
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div className="setting c-w">
            <FontAwesomeIcon icon={faGears} />
          </div>
          <div className="phone c-c">
            <FontAwesomeIcon icon={faMobileScreen} />
          </div>
          <div className="star c-w">
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="email c-c">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
        </div>
      </DrawContainer>
    </Styled_Contact_Us>
  );
};

export default Contact_Us;
