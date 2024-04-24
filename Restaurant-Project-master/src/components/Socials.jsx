import React from "react";
import { socialData } from "../data";

const Socials = () => {
  return (
    <div className="flex gap-x-[10px]">
      {socialData.map((item, index) => {
        return (
          <a
           
          >
          
          </a>
        );
      })}
    </div>
  );
};
export default Socials;