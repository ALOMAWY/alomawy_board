import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBrush,
  faCircleDollarToSlot,
  faCode,
  faDesktop,
  faFire,
  faPersonBreastfeeding,
  faServer,
  faShieldHalved,
  IconName,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import servicesJSON from "../data/services.json";

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  place-items: center;
  width: 100%;
  height: 100%;
  align-content: center;
  gap: 1rem;
`;
const Styled_Service = styled.div`
  position: relative;
  transform: translate(0px, 0px);
  color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 250px;
  padding: 10px;
  transition: 0.2s;
  backdrop-filter: blur(5px);
  margin: 7px;
  animation: serv 3s linear;
  animation-timeline: view(200px 40px);
  width: calc(100% - 1rem);

  @media (max-width: 991px) {
    width: 90%;
  }

  & .icon {
    svg {
      font-size: 1.6rem;
    }
  }

  & .title {
    font-size: 1rem;
    text-align: center;
    font-weight: bold;
    color: var(--secondary-color);
  }
  & .explain {
    font-size: 0.6rem;
    line-height: 1.7;
    letter-spacing: 3px;
    opacity: 0.7;
    max-width: 95%;
    text-align: center;
    color: var(--background-white-color);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid var(--main-color);
    box-shadow: var(--background-main-color) 0px 0px 15px;
    background-color: var(--background-main-color);
    border-radius: 40px;
    z-index: -1;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

interface ServiceInterface {
  service: string;
  explain: string;
  icon: IconName;
}

const icons: { [key: string]: IconProp } = {
  faShieldHalved,
  faCode,
  faFire,
  faDesktop,
  faCircleDollarToSlot,
  faBrush,
  faPersonBreastfeeding,
  faServer,
};

const Services = () => {
  const [data, setData] = useState<ServiceInterface[] | []>([]);

  useEffect(() => {
    return setData(servicesJSON as ServiceInterface[]);
  }, []);

  return (
    <ServicesContainer>
      {data &&
        data.map((serv, i) => {
          return (
            <Service
              key={i}
              service={{
                explain: serv.explain,
                service: serv.service,
                icon: serv.icon,
              }}
            />
          );
        })}
    </ServicesContainer>
  );
};

export default Services;

type ServiceProp = {
  service: ServiceInterface;
};

const Service = ({ service }: ServiceProp) => {
  const { t } = useTranslation();

  return (
    <Styled_Service>
      <div>
        <span className="icon">
          <FontAwesomeIcon icon={icons[service.icon]} />
        </span>
      </div>
      <div>
        <h2 className="title">{t(`services.items.${service.service}`)}</h2>
      </div>
      <div>
        <p className="explain">{t(`services.items.${service.explain}`)}</p>
      </div>
    </Styled_Service>
  );
};
