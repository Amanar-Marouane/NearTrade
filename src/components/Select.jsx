import React, { useEffect, useState } from 'react'

const Select = ({ children, name, label, src, value = '' }) => {
    const [selectValue, setSelectValue] = useState('');

    useEffect(() => {
        setSelectValue(value);
    }, [value]);

    return (
        <div className="w-full px-6 flex flex-col gap-1">
            <label htmlFor={name} className="text-[#374151] text-lg font-semibold p-1">
                {label}
            </label>
            <div className={`flex justify-center items-center border p-1`}>
                <label htmlFor={name}>
                    <img src={src} alt="Input Icon" className="w-8 h-8" />
                </label>
                <select value={selectValue} onChange={(e) => setSelectValue(e.target.value) } className="w-full p-2 placeholder:text-lg focus:ring-0 focus:outline-none focus:border-transparent" name={name} id={name}>
                    {children}
                </select>
            </div>
            <span className={`${name}-error error text-red-500 text-sm mt-1`}></span>
        </div>
    )
}

export default Select