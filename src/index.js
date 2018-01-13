import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

const DEFAULT_DRAWER_WIDTH = 240;

const styles = theme => {
  let drawerWidth;
  if (theme.overrides &&
    theme.overrides.MuiAppContainer &&
    theme.overrides.MuiAppContainer.drawerWidth
  ) {
    drawerWidth = theme.overrides.MuiAppContainer.drawerWidth
  } else if (theme.overrides &&
    theme.overrides.MuiDrawer &&
    theme.overrides.MuiDrawer.paper &&
    theme.overrides.MuiDrawer.paper.width
  ) {
    drawerWidth = theme.overrides.MuiDrawer.paper.width
  } else {
    drawerWidth = DEFAULT_DRAWER_WIDTH;
  }

  return {
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },

    content: {
      // AppBar height on mobile (56px)
      marginTop: 56, 

      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),

      [theme.breakpoints.up('sm')]: {
        // AppBar height on mobile (64px)
        marginTop: 64,
      },
    },
    contentShift: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),

      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.direction === 'rtl'  ? 'marginRight' : 'marginLeft']: drawerWidth,
      }
    },

    drawerPaper: {
      width: drawerWidth,
    },
  }
};

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    const { classes, theme } = props;

    const breakpointWidth = theme.breakpoints.width('md');
    const mediaQuery = `(min-width: ${breakpointWidth}px)`
    this.mediaQueryList = window.matchMedia(mediaQuery);
    const drawerOpen = this.mediaQueryList.matches;

    this.state = {
      appBarProps: {
        className: classNames(classes.appBar, { [classes.appBarShift]: drawerOpen, })
      },
      contentProps: {
        className: classNames(classes.content, { [classes.contentShift]: drawerOpen })
      },
      drawerProps: {
        type: drawerOpen ? 'persistent' : 'temporary',
        open: drawerOpen,
        onClose: () => this.handleDrawerToggle(),
        classes: {
          paper: classes.drawerPaper
        },
        ModalProps: {
          keepMounted: true, // Better open performance on mobile.
        }
      }
    }
  }

  componentWillMount() {
    this.mediaQueryList.addListener(
      this.handleMediaQueryChange
    );
  }

  componentWillUnmount() {
    this.mediaQueryList.removeListener(
      this.handleMediaQueryChange
    );
  }

  handleMediaQueryChange = () => {
    this.setState(prevState => ({
      ...prevState,

      drawerProps: {
        ...prevState.drawerProps,
        type: this.mediaQueryList.matches ? 'persistent' : 'temporary'
      },
    }));
  };

  handleDrawerToggle = (temporaryOnly) => {
    if (temporaryOnly == null || (temporaryOnly && this.state.drawerProps.type === 'temporary')) {
      this.setState(prevState => {
        const drawerOpen = !prevState.drawerProps.open; 
        const { classes } = this.props;

        return {
          ...prevState,
          appBarProps: {
            className: classNames(classes.appBar, { [classes.appBarShift]: drawerOpen })
          },
          contentProps: {
            className: classNames(classes.content, { [classes.contentShift]: drawerOpen })
          },
          drawerProps: {
            ...prevState.drawerProps,
            open: drawerOpen,
          }
        }
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
    }
  }
  
  getContentProps = otherProps => {
    return {
      ...otherProps,
      className: classNames(
        otherProps && otherProps.className,
        this.state.contentProps.className
      )
    }
  }

  getDrawerProps = otherProps => {
    return {
      ...otherProps,
      ...this.state.drawerProps,
      classes: {
        ...otherProps && otherProps.classes,
        ...this.state.drawerProps.classes
      },
      onClose: () => {
        if (otherProps && otherProps.onClose) {
          otherProps.onClose();
        }
        this.handleDrawerToggle()
      },
      ModalProps: {
        keepMounted: true, // Better open performance on mobile.
      }
    }
  }

  render() {
    const { classes, theme, children } = this.props;

    if (typeof(children) === 'function') {
      return children({
        getAppBarProps: this.getAppBarProps,
        getContentProps: this.getContentProps,
        getDrawerProps: this.getDrawerProps,
        toggleDrawer: this.handleDrawerToggle
      });
    } else if (React.Children.count(children) === 0) {
      return null
    } else {
      // DOM/Component children
      // TODO: Better to check if children count === 1 and return null otherwise (like react-router)?
      //       Currently not possible to support multiple children components/elements (until React fiber)
      return React.Children.only(children)
    }
  }
}

AppContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(AppContainer);