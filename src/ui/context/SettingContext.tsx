import * as React from "react";
import { createContext } from 'react';


export interface SettingContextType {
    gitToken: string;
    gitRepo: string;
    gitOwner: string
  }

const defaultSettingValue = {
    gitToken: '',
    gitRepo: '',
    gitOwner: ''
  };

// export const SettingContext = createContext(1);
const SettingContext = createContext<SettingContextType>(defaultSettingValue);

export const SettingContextProvider = ({
    children,
    settingData: savedSettingData
}) => {
    return <SettingContext.Provider value={savedSettingData}>{children}</SettingContext.Provider>
}