import * as React from "react";

type buttonProps = {
  children: any;
  className?: string;
  autofocus?: boolean;
  variant?: 'primary' | 'secondary';
  isDisabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  className,
  autofocus,
  variant,
  isDisabled,
  type,
  onClick
}: buttonProps) => {

  let buttonClass = 'py-1.5 px-2 rounded-md transition-all overflow-visible'
  let textClass = 'text-sm font-medium'
  let hoverClass = ''

  switch (variant) {
    case "primary": {
      buttonClass += ' shadow-lg shadow-violet-300 bg-gradient-to-r from-purple-400 to-violet-500'
      textClass += ' text-white text-opacity-90'
      hoverClass += ' hover:from-purple-500 hover:to-violet-600 hover:shadow-purple-400'
      break
    }
    case "secondary": {
      buttonClass += '  shadow-sm shadow-slate-300 bg-slate-50 border border-slate-200'
      textClass += ' text-slate-700'
      hoverClass += ' hover:bg-slate-100 hover:shadow-slate-400 focus:bg-slate-200 focus:border-slate-300'
      break
    }
  }
  if (isDisabled) {
    buttonClass += ' opacity-50 cursor-not-allowed';
  }

  return (
    <button
      autoFocus={autofocus}
      onClick={onClick}
      className={`${buttonClass} ${textClass} ${hoverClass} ${className}`}
      disabled={isDisabled}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}