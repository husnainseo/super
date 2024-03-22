import React, { ReactNode } from 'react';

type Props = {}

const SearchPageSkeleton = (props: Props) => {
    const renderCard = (): ReactNode => (
        <div className={`w-[260px] font-Poppins bg-white`}>
            <div className="h-40 rounded-t-md relative overflow-hidden group bg-[#f9f4f4] animate-pulse"></div>
            <div className="flex justify-between items-center">
                <div className="h-2 bg-[#f9f4f4] animate-pulse rounded-xl mt-4 w-28"></div>
                <div className="h-2 bg-[#f9f4f4] animate-pulse rounded-xl mt-4 w-16"></div>
            </div>
            <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-48"></div>
            <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-40"></div>
            <div className="h-2 bg-[#f9f4f4] animate-pulse rounded mt-3 w-16"></div>
        </div>
    );

    return (
        <div className='h-screen flex justify-center w-full'>
            <div className='w-[1200px]'>
                <div className='h-2 w-72 bg-[#f9f4f4] rounded-xl mt-5 animate-pulse'></div>
                <div className='h-8 w-[400px] bg-[#f9f4f4] rounded mt-5 animate-pulse'></div>
                <div className='flex justify-between mt-5'>
                    <div className='flex gap-5'>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                        <div className='h-9 w-24  bg-[#f9f4f4] rounded animate-pulse'></div>
                    </div>
                    <div className='h-9 w-24 mt-5  bg-[#f9f4f4] rounded animate-pulse'></div>
                </div>
                <div className='h-8 w-[500px] bg-[#f9f4f4] rounded mt-5 animate-pulse'></div>
                <div className='flex gap-11 flex-wrap mt-5 justify-center'>
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                </div>
            </div>
        </div>
    );
};

export default SearchPageSkeleton;
