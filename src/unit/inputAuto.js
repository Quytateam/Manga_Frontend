import React, { useState } from "react";

export default function InputAuto({ pholder, data, onSelected, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedVal, setSelectedVal] = useState("");

  const handler = (e) => {
    setSuggestions(
      data.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setSelectedVal(input);
    onChange(input);
    console.log(suggestions);
  };

  const hideSuggs = (value) => {
    onSelected(value.title);
    setSelectedVal(value.title);
  };

  return (
    <>
      <input
        className="form-control"
        placeholder={pholder}
        type="search"
        value={selectedVal}
        onChange={handleChange}
        onKeyUp={handler}
      />
      <ul
        className="typeahead dropdown-menu"
        style={{
          top: "32px",
          width: "80%",
          left: "50%",
          transform: "translate(-55%)",
          display: "block",
        }}
      >
        {suggestions.map((item, idx) => (
          <li
            className="text-black hover:bg-gray-100 cursor-pointer py-2 px-4"
            key={item._id}
            onClick={() => {
              hideSuggs(item);
            }}
            value={item._id}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
}
