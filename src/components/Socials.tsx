import styled from "styled-components";
import socialMedia from "../data/socialMedia.json";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface SocialInterface {
  status: string;
  appName: string;
  color: {
    type: string;
    color: string;
  };
  content: string;
  logo: string;
  userName: string;
  posts: string;
  people: {
    type: string;
    friends: number;
    followers: number;
  };
  link: string;
}

const Styled_Socials = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;
  height: 100%;
  gap: 1rem 2rem;
  margin: 2rem 0;

  @media (max-width: 900px) {
    gap: 1rem 0.3rem;
  }
`;

const Socials = () => {
  const [data, setData] = useState<SocialInterface[] | []>([]);

  const socialMedias = socialMedia as unknown as SocialInterface[];
  useEffect(() => {
    setData(socialMedias);
  }, []);
  return (
    <Styled_Socials>
      {data &&
        data.map((social: SocialInterface) => {
          return (
            <Social
              social={{
                status: social.status,
                appName: social.appName,
                color: social.color,
                content: social.content,
                logo: social.logo,
                userName: social.userName,
                link: social.link,
                people: social.people,
                posts: social.posts,
              }}
            ></Social>
          );
        })}
    </Styled_Socials>
  );
};

const Styled_Social = styled.div`
  width: 100%;
  background: #ffffff50;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;
  height: fit-content;
  color: #fff;
  position: relative;
  border-radius: 10px;

  &:hover {
    scale: 1.05;
  }

  @media (max-width: 900px) {
    width: 90%;
  }
    
  div {
    width: 100%;
    padding: 13px;
    font-weight: normal;
  }

  img.logo {
    position: relative;
    left: -40%;
    top: 10px;
    z-index: 1;
    border-radius: 30%;
    rotate: 20deg;
    width: 50px;
    height: 50px;
  }
  .appName {
    width: calc(100% + 30px);
    position: absolute;
    left: 50%;
    top: 30px;
    transform: translate(-50%);
    background: #fff;
    color: #000;
    padding: 10px;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 100%;
      border: 8px solid #ffffff60;
    }

    &::before {
      left: 0;
      border-bottom-color: transparent;
      border-left-color: transparent;
    }

    &::after {
      right: 0;

      border-bottom-color: transparent;
      border-right-color: transparent;
    }
  }

  .part {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #00000050;

    span {
      font-weight: normal;
      font-size: 0.8rem;
    }
  }

  .visit {
    width: 100%;
    background: black;
    padding: 1rem;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    letter-spacing: 2px;
    a {
      color: #ffffff;
    }
  }
`;

type SocialType = {
  social: SocialInterface;
};

const Social = ({ social }: SocialType) => {
  const { t } = useTranslation();
  return (
    <Styled_Social style={{ backgroundColor: social.color.color + "50" }}>
      <div>
        <h3 className="appName">{t(`socials.items.${social.appName}`)}</h3>
        <img className="logo" src={social.logo} />
      </div>
      <div className="part">
        <span>{t(`socials.${social.people.type}`)}</span>
        <span>{+social.people.friends || +social.people.followers}</span>
      </div>
      <div className="part">
        <span>{t("socials.posts")}</span>
        <span>{t(`socials.items.${social.posts}`)}</span>
      </div>
      <div className="part">
        <span>{t("socials.username")}</span>
        <span>{social.userName}</span>
      </div>
      <div className="part">
        <span>{t(`socials.content`)}</span>
        <span>{t(`socials.items.${social.content}`)}</span>
      </div>
      <button className="visit" style={{ backgroundColor: social.color.color }}>
        <a href={social.link} target="_blank">
          {t(`socials.visit`)}
        </a>
      </button>
    </Styled_Social>
  );
};

export default Socials;
