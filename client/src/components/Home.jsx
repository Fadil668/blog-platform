import React from 'react'
import HeroSection from "../home/HeroSection";
import Trending from "../home/Trending";
import ComputerScience from '../home/ComputerScience';
import PopularCreators from "../home/PopularCreators";

function Home() {
  return (
    <>
    <HeroSection />
    <Trending />
    <ComputerScience />
    <PopularCreators />
    </>
  )
}

export default Home