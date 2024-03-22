import React, { FC } from 'react';
import PropertyCard from "./propertyCard";
import Link from "next/link";
import { IListing } from '@/types/types';
type Props = {
    listing: IListing[]
}

const CardsPagination: FC<Props> = ({ listing }) => {
    return (
        <div className='flex flex-wrap gap-6 justify-center sm:justify-normal'>
            {listing.slice(0, 30).map((property, index) => (
                <Link href={`/property/${property._id}`} key={index}>
                    <PropertyCard
                        key={index}
                        price={property.price}
                        location={property.location}
                        areaSize={property.area.size}
                        areaType={property.area.type}
                        beds={property.bedrooms}
                        baths={property.bathrooms}
                        image={property.images}
                        time={property.createdAt}
                        subPropertyType={property.subPropertyType}
                        city={property.city}
                        purpose={property.purpose}
                    />
                </Link>
            ))}
        </div>
    )
}

export default CardsPagination