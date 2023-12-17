import React, { useState, useEffect } from "react";

const KeywordInput = ({
  value,
  setValue,
  flex,
  itemsAlignment,
  links,
  placeholder,
}) => {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (value && value.length > 0) {
      setKeywords(value.split(";"));
    }
  }, [value]);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      setKeywords((prevKeywords) => [...prevKeywords, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveKeyword = (e, index) => {
    e.preventDefault();
    setKeywords((prevKeywords) => prevKeywords.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setValue(keywords.join(";"));
  }, [keywords, setValue]);

  return (
    <div>
      <div className={`flex flex-${flex} gap-2 items-${itemsAlignment} m-1`}>
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex flex-row bg-[#EFFBFA] gap-2 text-m p-2 pr-4 rounded-md"
          >
            {!links && keyword}
            {links && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`https://${keyword}`, "_blank");
                }}
                className="text-[#2051FF] hover:text-[#FF5555]"
              >
                {keyword}
              </button>
            )}
            <button onClick={(e) => handleRemoveKeyword(e, index)}>
              &times;
            </button>
          </div>
        ))}
        <input
          className={`${!links && "w - 1 / 3"} ${
            links && "w-full"
          } h-10 px-2 m-1 border-2 border-[#9D9494] rounded-md outline-none focus:border-[#FF5555]`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default KeywordInput;
