import React, { FC, useState } from "react";
import { Company } from "../../types/company";
import Logo from "../../assets/Logo.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
interface SideMenuProps {
  shipments: Company[];
}
const SideMenuSm: FC<SideMenuProps> = ({ shipments }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };
  const companiesToDisplay = shipments.length === 0 ? shipments : shipments;
  return (
    <div className="sidemenu-sm">
      <div className="sidemenu-sm__logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="sidemenu-sm__buttons">
        {isOpen ? (
          <RiCloseFill color="white" size={30} onClick={openMenu} />
        ) : (
          <RxHamburgerMenu color="white" size={30} onClick={openMenu} />
        )}
      </div>
      {isOpen && (
        <div className="sidemenu-sm__menu">
          <div className="sidemenu-sm__logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sidemenu__list">
            <h4>Shipment list</h4>
            <ul>
              {companiesToDisplay.map((company) => (
                <Link
                  to={`/company/${company.id}`}
                  key={company.id}
                  onClick={openMenu}
                >
                  <li>{company.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenuSm;
