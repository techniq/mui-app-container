import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import List from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AccountCircle from 'material-ui-icons/AccountCircle';
import { mailFolderListItems, otherMailFolderListItems } from '../stories/tileData';

import AppContainer from '../src';

storiesOf('Examples', module)
  .add('empty (no errors)', () => (
    <AppContainer />
  ))
  .add('simple', () => (
    <AppContainer>
      {({ getAppBarProps, getDrawerProps, getContentProps, toggleDrawer }) => (
        <div>
          <AppBar {...getAppBarProps()}>
            <Toolbar>
              <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={() => toggleDrawer()}
              >
                <MenuIcon />
              </IconButton>

              <Typography type="title" color="inherit" style={{ flex: 1 }} noWrap>
                Responsive drawer
              </Typography>

              <IconButton color="contrast">
                <AccountCircle />
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

          <main {...getContentProps()}>
            <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
          </main>
        </div>
      )}
    </AppContainer>
  ))
