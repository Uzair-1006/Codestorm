import Navbar from "@/Components/Navbar";
import React from "react";
import Hero from "@/Components/Hero";
import Features from "@/Components/Features"
import CTA from "@/Components/CTA";
import RegisterSteps from "@/Components/registerUser";
import Footer from "@/Components/Footer";
const page = () =>{
  return(
    <>
      <Navbar/>
      <Hero/>
      <Features/>
      <CTA/>
      <RegisterSteps/>
      <Footer />
    </>
  )
}
export default page;