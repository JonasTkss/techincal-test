import React, { Suspense, useEffect, useState } from "react";
import SideMenu from "./components/SideMenuComponents/SideMenu";
import SearchInputField from "./components/SearchComponent/SearchInputField";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchShipments } from "./utils/shipmentsAPI";
import CompanyView from "./components/CompanyComponents/CompanyView";
import { Company } from "./types/company";
import SideMenuSm from "./components/SideMenuComponents/SideMenuSm";

function App() {
  const [shipments, setShipments] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
  const [isLarge, setLarge] = useState(window.innerWidth > 1024);

  useEffect(() => {
    fetchShipments()
      .then((data) => setShipments(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  const search = (searchValue: string) => {
    const filtered = shipments.filter((company) =>
      company.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCompanies(filtered);
  };

  const updateScreen = () => {
    setLarge(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  });

  return (
    <BrowserRouter>
      <div className="App">
        {isLarge ? (
          <SideMenu
            shipments={shipments}
            filteredCompanies={filteredCompanies}
          />
        ) : (
          <SideMenuSm shipments={shipments} />
        )}
        <div className="wrapper">
          <SearchInputField
            onSearch={search}
            searchResults={filteredCompanies}
          />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route
                path="/company/:id"
                element={<CompanyView shipments={shipments} />}
              />
              <Route path="/" element={<CompanyView shipments={shipments} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
