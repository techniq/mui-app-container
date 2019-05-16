declare module 'mui-app-container' {
  import React from 'react';
  import { ModalProps } from '@material-ui/core/Modal';
  import { AppBarProps } from '@material-ui/core/AppBar';
  import { DrawerProps } from '@material-ui/core/Drawer';

  interface AppContainerProps {
    classes?: {};
    disableContainer?: boolean;
  }

  interface AppContainerState {
    appBarProps: {
      className: string;
    };
    getAppBarProps: (props: AppBarProps) => any;

    contentProps: {
      className: string;
    };
    getContentProps: (props: React.HTMLProps<HTMLElement>) => any;

    drawerProps: {
      variant: 'persistent' | 'temporary';
      open: boolean;
      onClose: () => void;
      classes: {
        paper: string;
      };
      ModalProps: ModalProps;
    };
    getDrawerProps: (props: DrawerProps) => any;

    toggleDrawer: (temporaryOnly?: boolean) => void;
  }

  const AppContainerContext: React.Context<AppContainerState>;
  export { AppContainerContext };

  export default class AppContainer extends React.Component<AppContainerProps> {
    static Consumer: React.Consumer<AppContainerState>;
  }
}
