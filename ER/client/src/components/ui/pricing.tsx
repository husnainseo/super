import React, { FC } from "react";
type Props = {
  price: number;
};
const formatPrice: FC<Props> = ({ price }) => {
  if (price >= 10000000) {
    // Convert to Millions
    const crore = (price / 10000000);
    return `${crore} Crore`;
  } else if (price >= 100000) {
    // Convert to Lacs
    const lacs = (price / 100000);
    return `${lacs} Lac`;
  }  else {
    // Default: display the price as is
    return `${price}`;
  }
};

export default formatPrice;
