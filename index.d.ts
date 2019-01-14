declare module 'mui-app-container' {
  import React from 'react';
  import { ModalProps } from '@material-ui/core/Modal';

  interface AppContainerProps {
    classes?: {};
    disableContainer?: boolean;
  }

  interface AppContainerState {
    appBarProps: {
      className: string;
    };
    getAppBarProps: () => any;

    contentProps: {
      className: string;
    };
    getContentProps: () => any;

    drawerProps: {
      variant: 'persistent' | 'temporary';
      open: boolean;
      onClose: () => void;
      classes: {
        paper: string;
      };
      ModalProps: ModalProps;
    };
    getDrawerProps: () => any;

    toggleDrawer: (temporaryOnly?: boolean) => void;
  }

  const AppContainerContext: React.Context<AppContainerState>;
  export { AppContainerContext };

  export default class AppContainer extends React.Component<AppContainerProps> {
    static Consumer: React.Consumer<AppContainerState>;
  }
}
