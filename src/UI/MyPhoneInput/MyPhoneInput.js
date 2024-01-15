import React from 'react';
import { InputMask } from 'primereact/inputmask';

const MyPhoneInput = ({value, onChange}) => {
    return (
        <InputMask className='form-control' id="ssn" mask="+7 (9**)-***-****" placeholder="Телефон: +7(***)-***-****" value={value} onChange={onChange}></InputMask>

    );
};

export default MyPhoneInput;