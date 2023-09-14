import React from "react";

export const formatDescription = (text: string) => {
  const textArr = text.split("\n");

  return textArr.map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index !== textArr.length - 1 && <br />}
    </React.Fragment>
  ));
};
