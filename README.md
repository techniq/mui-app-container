Orchestrates Material-UI 1.0's [AppBar](https://material-ui.com/demos/app-bar/), [Drawer](https://material-ui.com/demos/drawers/) and content (ex. `<main>`) to provide a responsive application layout.

- Sets `<Drawer>` props based on screen size
  - `960px` (md) and up: sets `variant`  to `persistent` and defaults `open` to `true`
  - Less than `960px` (ex. phone): sets `variant`  to `temporary` and defaults `open` to `false`
- Shifts and resizes `<AppBar>` and content based when `<Drawer>` is `persistent` and `open`
- Provides `toggleDrawer` to close drawer
  - Supports toggling drawer only when variant is temporary (`onClick` on list item on drawer) or on all calls (AppBar menu icon)
- Access state via context using `<AppContainer.Consumer>`

## Usage
```js
import AppContainer from 'mui-app-container';

export default () => (
  <AppContainer>
    {({ getAppBarProps, getDrawerProps, toggleDrawer }) => (
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
              App Container Example
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

        <main>
          <Typography>{'Content goes here'}</Typography>
        </main>
      </div>
    )}
  </AppContainer>
);
```
