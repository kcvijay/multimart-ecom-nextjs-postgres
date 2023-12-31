"use client";

import React, { useState } from "react";

const MenuBtn = () => {
  const [active, setActive] = useState(false);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <button
      className={`menuBtn ${active ? "activeBtn" : ""}`}
      onClick={toggleActive}
    >
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
  );
};

export default MenuBtn;
