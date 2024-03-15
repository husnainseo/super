import React from 'react';
import Image from 'next/image';

type Props = {}

const sectionE = (props: Props) => {
  return (
    <div className="w-full flex justify-center mb-12">
    <div className="w-[80%]">
    <h2 className="text-xl font-medium ">Choose from a wide variety of commercial properties</h2>
    <div className='flex gap-5 justify-center'>
        <div className='relative overflow-hidden rounded-xl'><Image src={"/mall.jpg"} alt='commercial' height={350} width={350} className='rounded-xl h-96 object-cover'/><div className="absolute inset-0 bg-gradient-to-b from-zinc-400 via-[#141d1f]/50 to-transparent"></div></div>
        <div className='relative overflow-hidden rounded-xl'><Image src={"/shop.jpg"} alt='commercial' height={350} width={350} className='rounded-xl h-96 object-cover'/><div className="absolute inset-0 bg-gradient-to-b from-zinc-400 via-white/50 to-transparent"></div></div>
    </div>
    </div>
    </div>
  )
}

export default sectionE;