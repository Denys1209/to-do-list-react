import React, { useState, useEffect } from "react";
import DealWidget from "./dealWidget";

const ListOfDeals = ({
  fetchDealsFunction,
  onAddToProject,
  checkInProject,
}) => {
  const [deals, setDeals] = useState([]);
  const [displayesDeals, setDisplayesDeals] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("name"); // Default search field

  useEffect(() => {
    const fetchDeals = async () => {
      const allDeals = await fetchDealsFunction();
      setDeals(allDeals);
      setDisplayesDeals(allDeals);
    };
    fetchDeals();
  }, []);

  useEffect(() => {
    const filteredDeals = deals.filter((deal) => {
      const fieldValue = String(deal[searchField]).toLowerCase();
      return fieldValue.includes(searchTerm.toLowerCase());
    });
    setDisplayesDeals(filteredDeals);
  }, [searchTerm, searchField]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  // Function to handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setSearchField(direction);
    setDeals(() =>
      [...deals].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    );
  };

  const onDelete = (id) => {
    setDeals(() => deals.filter((x) => x.id !== id));
    setDisplayesDeals(deals);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          {["time", "name", "priority", "content", "tags"].map((field) => (
            <button
              key={field}
              onClick={() => handleSort(field)}
              className={`px-4 py-2 ${
                sortConfig.key === field
                  ? sortConfig.direction === "asc"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                  : ""
              }`}
            >
              Sort by {field.charAt(0).toUpperCase() + field.slice(1)}
              {sortConfig.key === field && (
                <span
                  className={`ml-2 ${
                    sortConfig.direction === "asc"
                      ? "border-b-2 border-blue-500"
                      : "border-t-2 border-gray-500"
                  }`}
                ></span>
              )}
            </button>
          ))}
        </div>
        <div className="flex">
          <form className="flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search deals..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
          </form>
        </div>
      </div>
      {displayesDeals.map((deal) => (
        <DealWidget
          key={deal.id}
          deal={deal}
          onDelete={onDelete}
          onAddToProject={onAddToProject}
          checkInProject={checkInProject}
        />
      ))}
    </div>
  );
};

export default ListOfDeals;
