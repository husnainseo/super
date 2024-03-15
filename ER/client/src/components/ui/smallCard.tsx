import React,{FC} from 'react';
import Image from 'next/image';

type Props = {
    img:string,
    title:string,
}

const SmallCard: FC<Props> = ({img,title}) => {
  return (
   <>
   <div className='hover:cursor-pointer'>
    <Image src={img} alt='img' width={150} height={120} className='rounded-2xl'/>
    <h1 className='mt-5'>{title}</h1>
   </div>
   </>
  )
}

export default SmallCard;