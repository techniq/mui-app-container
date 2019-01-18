import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

// Added (but unused) to guarantee stylesheets are inserted before AppContainer's (https://css-tricks.com/precedence-css-order-css-matters/)
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';

const DEFAULT_DRAWER_WIDTH = 240;

const AppContainerContext = React.createContext({
  appBarProps: {},
  getAppBarProps: () => {},

  contentProps: {},
  getContentProps: () => {},

  drawerProps: {},
  getDrawerProps: () => {},

  toggleDrawer: () => {}
});

const styles = theme => {
  let drawerWidth;
  if (
    theme.overrides &&
    theme.overrides.MuiAppContainer &&
    theme.overrides.MuiAppContainer.drawerWidth
  ) {
    drawerWidth = theme.overrides.MuiAppContainer.drawerWidth;
  } else if (
    theme.overrides &&
    theme.overrides.MuiDrawer &&
    theme.overrides.MuiDrawer.paper &&
    theme.overrides.MuiDrawer.paper.width
  ) {
    drawerWidth = theme.overrides.MuiDrawer.paper.width;
  } else {
    drawerWidth = DEFAULT_DRAWER_WIDTH;
  }

  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarShift: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    },

    content: {
      marginTop: 56, // AppBar height on mobile (56px)

      [theme.breakpoints.up('sm')]: {
        marginTop: 64, // AppBar height on mobile (64px)

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      }
    },
    contentShift: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: drawerWidth,

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      }
    },

    drawerPaper: {
      width: drawerWidth
    }
  };
};

class AppContainer extends React.Component {
  static Consumer = AppContainerContext.Consumer;

  constructor(props) {
    super(props);
    const { classes, theme } = props;

    const breakpointWidth = theme.breakpoints.width('md');
    const mediaQuery = `(min-width: ${breakpointWidth}px)`;
    this.mediaQueryList =
      typeof window === 'undefined'
        ? { matches: false }
        : window.matchMedia(mediaQuery);
    const drawerOpen = this.mediaQueryList.matches;

    this.state = {
      appBarProps: {
        className: classNames(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })
      },
      getAppBarProps: this.getAppBarProps,

      contentProps: {
        className: classNames(classes.content, {
          [classes.contentShift]: drawerOpen
        })
      },
      getContentProps: this.getContentProps,

      drawerProps: {
        variant: drawerOpen ? 'persistent' : 'temporary',
        open: drawerOpen,
        onClose: () => this.handleDrawerToggle(),
        classes: {
          paper: classes.drawerPaper
        },
        ModalProps: {
          keepMounted: true // Better open performance on mobile.
        }
      },
      getDrawerProps: this.getDrawerProps,

      toggleDrawer: this.handleDrawerToggle
    };
  }

  componentDidMount() {
    this.mediaQueryList.addListener(this.handleMediaQueryChange);
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(this.handleMediaQueryChange);
  }

  handleMediaQueryChange = () => {
    this.setState(prevState => ({
      ...prevState,

      drawerProps: {
        ...prevState.drawerProps,
        variant: this.mediaQueryList.matches ? 'persistent' : 'temporary'
      }
    }));
  };

  handleDrawerToggle = temporaryOnly => {
    if (
      temporaryOnly == null ||
      (temporaryOnly && this.state.drawerProps.variant === 'temporary')
    ) {
      this.setState(prevState => {
        const drawerOpen = !prevState.drawerProps.open;
        const { classes } = this.props;

        return {
          ...prevState,
          appBarProps: {
            className: classNames(classes.appBar, {
              [classes.appBarShift]: drawerOpen
            })
          },
          contentProps: {
            className: classNames(classes.content, {
              [classes.contentShift]: drawerOpen
            })
          },
          drawerProps: {
            ...prevState.drawerProps,
            open: drawerOpen
          }
        };
      });
    }
  };

  getAppBarProps = otherProps => {
    return {
      ...otherProps,
      className: classNames(
        otherProps && otherProps.className,
        this.state.appBarProps.className
      )
    };
  };

  getContentProps = otherProps => {
    return {
      ...otherProps,
      className: classNames(
        otherProps && otherProps.className,
        this.state.contentProps.className
      )
    };
  };

  getDrawerProps = otherProps => {
    return {
      ...otherProps,
      ...this.state.drawerProps,
      classes: {
        ...(otherProps && otherProps.classes),
        ...this.state.drawerProps.classes
      },
      onClose: () => {
        if (otherProps && otherProps.onClose) {
          otherProps.onClose();
        }
        this.handleDrawerToggle();
      },
      ModalProps: {
        keepMounted: true // Better open performance on mobile.
      }
    };
  };

  renderChildren() {
    const { classes, disableContainer, children } = this.props;

    const wrappedChildren =
      typeof children === 'function' ? (
        <AppContainerContext.Consumer>{children}</AppContainerContext.Consumer>
      ) : (
        children
      );

    return disableContainer ? (
      wrappedChildren
    ) : (
      <div
        className={classNames(classes.content, {
          [classes.contentShift]: this.state.drawerProps.open
        })}
      >
        {wrappedChildren}
      </div>
    );
  }

  render() {
    return (
      <AppContainerContext.Provider value={this.state}>
        {this.renderChildren()}
      </AppContainerContext.Provider>
    );
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  disableContainer: PropTypes.bool
};

export { AppContainerContext };
export default withStyles(styles, { withTheme: true })(AppContainer);
