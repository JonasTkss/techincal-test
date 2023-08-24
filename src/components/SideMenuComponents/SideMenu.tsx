import React, { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import { Company } from "../../types/company";

interface SideMenuProps {
  shipments: Company[];
  filteredCompanies: Company[];
}

const SideMenu: FC<SideMenuProps> = ({
  shipments,
  filteredCompanies,
}): JSX.Element => {
  const companiesToDisplay =
    filteredCompanies.length === 0 ? shipments : filteredCompanies;

  return (
    <div className="sidemenu">
      <div className="sidemenu__logo">
        <Link to="/">
          <img src={Logo} alt="logo" />
        </Link>
      </div>
      <div className="sidemenu__list">
        <h4>Shipment list</h4>
        <ul>
          {companiesToDisplay.map((company) => (
            <Link to={`/company/${company.id}`} key={company.id}>
              <li>{company.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
