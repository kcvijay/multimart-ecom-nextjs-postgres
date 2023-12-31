import React from "react";

interface HeaderTextProp {
  headerText: string;
}

const ContainerHeader = ({ headerText }: HeaderTextProp) => {
  return (
    <div className="mb-8">
      <h2 className="text-[32px] font-bold text-slate-800">{headerText}</h2>
    </div>
  );
};

export default ContainerHeader;
