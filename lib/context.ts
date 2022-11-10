import { createContext } from 'react';

//context default values fed to the global _app file
export const UserContext = createContext<{ user: any, username: string | null }>({ user: null, username: null });
// UserContext.Provider overrides defaults with userData from firebase so any of the children can access user and username
