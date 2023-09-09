import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Filters = ({ showFilters, setShowFilters, filters, setFilters }) => {
  const categories = [
    // {
    //   name: "All",
    //   value: "",
    // },
    {
      name: "Electronics",
      value: "electronics",
    },
    {
      name: "Home",
      value: "home",
    },
    {
      name: "Sports",
      value: "sports",
    },

    { name: "Fashion", value: "fashion" },
  ];

  const ages = [
    // {
    //   name: "All",
    //   value: "",
    // },

    {
      name: "0-2 years old",
      value: "0-2 ",
    },
    {
      name: "3-5 years old",
      value: "3-5 ",
    },
    {
      name: "6-8 years old",
      value: "6-8 ",
    },
    {
      name: "9-12 years old",
      value: "9-12 ",
    },
    {
      name: "13 -20 years old",
      value: "13-20 ",
    },
  ];
  return (
    <div className="w-72 flex flex-col filters ">
      <div className="flex justify-between p-3">
        <h1 className="text-secondary-800">Filters</h1>
        <CloseIcon onClick={() => setShowFilters(!showFilters)} />
      </div>
      <div className="flex flex-col gap-1 mt-5 p-2">
        <h1 className="text-xl">Categories</h1>
        <div className="flex flex-col item-center gap-2">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-1 mt-5 p-2">
          <h1>Ages</h1>
          <div className="flex flex-col item-center gap-2">
            {ages.map((age) => {
              return (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="age"
                    checked={filters.age.includes(age.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          age: [...filters.age, age.value],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          age: filters.age.filter((item) => item !== age.value),
                        });
                      }
                    }}
                  />
                  <label htmlFor="age">{age.name}</label>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
