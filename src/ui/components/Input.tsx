import * as React from "react";

export const Input = ({ name, label, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
        <label className="block text-slate-500 text-xs font-medium mb-1"  htmlFor={label}>
            {label}
        </label>
        <input className="shadow shadow-slate-200 appearance-none border rounded w-full py-2 text-sm text-slate-800 px-3 mb-2
                    focus:shadow-outline focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200" 
                id={label}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                />
    </div>
  );
};