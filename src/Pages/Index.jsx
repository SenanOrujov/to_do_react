import React, { useState } from "react";
import SideBar from "../components/SideBar";
import BodyArea from "../components/BodyArea";

const Index = () => {
  return (
    <>
      <div className='flex w-full h-screen'>
        <div className='w-1/4 bg-[#222222]'>
          <SideBar />
        </div>
        <div className='w-3/4'>
          <BodyArea />
        </div>
      </div>
    </>
  );
};

export default Index;
