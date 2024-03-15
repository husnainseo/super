import React from "react";
import { styles } from "../../Styles/style";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className={`${styles.popup}`}>
      <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
    </div>
  );
};

export default Loader;
