import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CompanyView: FC<{ shipments: any[] }> = ({ shipments }): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const company = shipments.find((shipment) => shipment.id === id);
  const [boxes, setBoxes] = useState<string>(company?.boxes || "");
  const [remainingBoxes, setRemainingBoxes] = useState<number>(10);

  useEffect(() => {
    if (company) {
      const boxesArray = company.boxes
        ? company.boxes.split(",").map((box: any) => box.trim())
        : [];
      setBoxes(boxesArray.join(", "));
      setRemainingBoxes(Math.max(0, 10 - boxesArray.length));
    }
  }, [company]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBox = event.target.value;
    const cleanedBox = newBox.replace(/,{2,}/g, ",");
    setBoxes(cleanedBox);
    setRemainingBoxes(Math.max(0, 10 - cleanedBox.split(",").length));
  };

  if (!company) {
    return (
      <div className="company-placeholder">
        <h1>Select a company</h1>
      </div>
    );
  }

  return (
    <div className="company-view">
      <div className="company-view__title">
        <h1>{company.name}</h1>
      </div>
      <div className="company-view__contact">
        <p>{company.email}</p>
      </div>
      <div className="company-view__cargo">
        <p>Cargo boxes</p>
        <input type="text" value={boxes} onChange={handleInputChange} />
      </div>
      <div className="company-view__required">
        <h2>Number of required cargo bays</h2>
        <div className="company-view__required--number">
          <h1>{remainingBoxes}</h1>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
