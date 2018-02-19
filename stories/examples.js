import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

// Imported here to test CSS stylesheet order
import AppContainer from '../src';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import { mailFolderListItems, otherMailFolderListItems } from '../stories/tileData';

const ExampleAppContainer = props => (
  <AppContainer {...props}>
    {({ getAppBarProps, getDrawerProps, getContentProps, toggleDrawer }) => (
      <div>
        <AppBar {...getAppBarProps()}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => toggleDrawer()}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="title" color="inherit" style={{ flex: 1 }} noWrap>
              Responsive drawer
            </Typography>

            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer {...getDrawerProps()}>
          <div>
            <Divider />
            <List>
              {mailFolderListItems(() => toggleDrawer(true))}
            </List>
            <Divider />
            <List>
              {otherMailFolderListItems(() => toggleDrawer(true))}
            </List>
          </div>
        </Drawer>

        <main {...props.disableContainer && getContentProps()}>
          <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
        </main>
      </div>
    )}
  </AppContainer>
)

storiesOf('Examples', module)
  .add('basic', () => (
    <ExampleAppContainer />
  ))

  .add('disableContainer (apply getContentProps manually)', () => (
    <ExampleAppContainer disableContainer />
  ))

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
    )
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
    )
  })

  .add('empty (no errors)', () => (
    <AppContainer />
  ))
