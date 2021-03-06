import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

// Imported here to test CSS stylesheet order
import AppContainer from '../src';

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  mailFolderListItems,
  otherMailFolderListItems
} from '../stories/tileData';

const ExampleAppContainer = props => (
  <AppContainer {...props}>
    {({ getAppBarProps, getDrawerProps, getContentProps, toggleDrawer }) => (
      <Fragment>
        <AppBar {...getAppBarProps()}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
              Responsive drawer
            </Typography>

            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer {...getDrawerProps()}>
          <div>
            <Divider />
            <List>{mailFolderListItems(() => toggleDrawer(true))}</List>
            <Divider />
            <List>{otherMailFolderListItems(() => toggleDrawer(true))}</List>
          </div>
        </Drawer>

        <main {...props.disableContainer && getContentProps()}>
          <Typography noWrap>
            {'You think water moves fast? You should see ice.'}
          </Typography>
        </main>
      </Fragment>
    )}
  </AppContainer>
);

const ExampleAppContainerWithContext = props => (
  <AppContainer {...props}>
    <AppContainer.Consumer>
      {({ getAppBarProps, toggleDrawer }) => (
        <AppBar {...getAppBarProps()}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" style={{ flex: 1 }} noWrap>
              Responsive drawer
            </Typography>

            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
    </AppContainer.Consumer>

    <AppContainer.Consumer>
      {({ getDrawerProps, toggleDrawer }) => (
        <Drawer {...getDrawerProps()}>
          <div>
            <Divider />
            <List>{mailFolderListItems(() => toggleDrawer(true))}</List>
            <Divider />
            <List>{otherMailFolderListItems(() => toggleDrawer(true))}</List>
          </div>
        </Drawer>
      )}
    </AppContainer.Consumer>

    <main>
      <Typography noWrap>
        {'You think water moves fast? You should see ice.'}
      </Typography>
    </main>
  </AppContainer>
);

storiesOf('Examples', module)
  .add('basic', () => <ExampleAppContainer />)

  .add('disableContainer (apply getContentProps manually)', () => (
    <ExampleAppContainer disableContainer />
  ))

  .add('using context consumers', () => <ExampleAppContainerWithContext />)

  .add('override drawer width (MuiAppContainer)', () => {
    const theme = createMuiTheme({
      overrides: {
        MuiAppContainer: {
          drawerWidth: 320
        }
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <ExampleAppContainer />
      </MuiThemeProvider>
    );
  })

  .add('override drawer width (MuiDrawer)', () => {
    const theme = createMuiTheme({
      overrides: {
        MuiDrawer: {
          paper: {
            width: 320
          }
        }
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <ExampleAppContainer />
      </MuiThemeProvider>
    );
  })

  .add('empty (no errors)', () => <AppContainer />);
