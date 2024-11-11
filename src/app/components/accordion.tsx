"use client";
import React, { useState } from "react";
import "../globals.css";

interface AccordionProps {
  children: React.ReactNode;
  isOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ children, isOpen = false }) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="accordion">
      <button onClick={toggle}>{isExpanded ? "X" : "Agregar"}</button>
      <div className={isExpanded ? "content" : "content hidden"}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
