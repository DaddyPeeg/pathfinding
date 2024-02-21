import React from "react";

const Youtube = ({ data }) => {
  let categorized = data.reduce((acc, curr) => {
    const { id, name, category } = curr;
    if (!acc[category]) {
      acc[category] = {
        items: [],
      };
    }
    acc[category].items.push({ id, name });
    return acc;
  }, {});
  console.log(Object.keys(categorized));
  return <div></div>;
};

export default Youtube;
