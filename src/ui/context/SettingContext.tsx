import * as React from "react";
import { createContext, useState } from 'react';


const defaultSettingValue = {
    setting: {
      git_token: '',
      git_repo: 'Tikit-Design-Doc-Data',
      git_owner: 'JOEX-Design'
    },
    setSetting: (any) => {}
  };

export const SettingContext = createContext(defaultSettingValue);

export const SettingContextProvider = (props) => {

  const [setting, setSetting] = useState(defaultSettingValue.setting)
  console.log('context data', setting)
  const value = {
    setting, setSetting
  }
    return (
      <SettingContext.Provider value={value}>
        {props.children}
      </SettingContext.Provider>
    )
  }
