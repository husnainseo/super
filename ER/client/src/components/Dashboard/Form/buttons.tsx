import { FormState } from '@/types/types';
import React,{FC} from 'react'

type Props = {
    buttonConfig: Array<{
        type: string;
        icon?: React.ReactNode;
        label: string;
      }>,
      formProperty: keyof FormState, 
      activeClass: string,
      inactiveClass: string,
      form:FormState,
      setForm:React.Dispatch<React.SetStateAction<FormState>>
}

const renderButtons:FC<Props> = ({buttonConfig,formProperty,activeClass,inactiveClass, form, setForm}) => {
    return buttonConfig.map((config) => (
        <button
          key={config.type}
          onClick={() => setForm({ ...form, [formProperty]: config.type })}
          className={`${
            form[formProperty] === config.type ? activeClass : inactiveClass
          }`}
        >
          {config.icon}
          {config.label}
        </button>
      ));
}

export default renderButtons;