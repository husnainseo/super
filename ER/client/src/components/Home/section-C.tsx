import React from 'react';
import SectionACard from "../ui/sectionACard"

type Props = {}

const sectionC = (props: Props) => {
  return (
   <>
   <div className='relative w-full flex justify-center mb-12'>
   <div className='hidden xs:block absolute bg-purple-800 h-36 w-36 rounded-full top-5 left-72 blur-xl '></div>
      <div className='hidden xs:block absolute bg-[#3D3B40] h-24 w-24 rounded-full bottom-8 right-72 blur-xl'></div>
    <div className='top xs:px-16 xs:py-24 xs:gap-8 bg-zinc-200/30 backdrop-blur-xl inline-flex justify-center flex-wrap xs:shadow rounded-xl'>
    <SectionACard icon='/svgexport-2.svg' title='Buy a Property' description='Perfect homes, happy hearts' button='Browse Properties'/>
    <SectionACard icon='/svgexport-4.svg' title='Sell a Property' description='Sell high, thrive always any economy' button='Add Listing' flip/>
    <SectionACard icon='/svgexport-6.svg' title='Property on Rent' description='Renting, where love resides' button='Find Rentals'/>
   </div>
   </div>
   </>
  )
}

export default sectionC