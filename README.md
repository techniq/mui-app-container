Orchestrates Material-UI 1.0's [AppBar](https://material-ui-next.com/demos/app-bar/), [Drawer](https://material-ui-next.com/demos/drawers/) and content (ex. `<main>`) to provide a responsive application layout.

- Sets `<Drawer>` props based on screen size
  - `960px` (md) and up: sets `type`  to `persistent` and defaults `open` to `true`
  - Less than `960px` (ex. phone): sets `type`  to `temporary` and defaults `open` to `false`
- Shifts and resizes `<AppBar>` and content based when `<Drawer>` is `persistent` and `open`
- Provides `toggleDrawer` to close drawer
  - Supports toggling drawer only when type is temporary (`onClick` on list item on drawer) or on all calls (AppBar menu icon)
