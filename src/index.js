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
      marginTop: 56, // AppBar height on mobile (56px)

      [theme.breakpoints.up('sm')]: {
        marginTop: 64, // AppBar height on mobile (64px)

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    },
    contentShift: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.direction === 'rtl'  ? 'marginRight' : 'marginLeft']: drawerWidth,

        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
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
        variant: drawerOpen ? 'persistent' : 'temporary',
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
        variant: this.mediaQueryList.matches ? 'persistent' : 'temporary'
      },
    }));
  };

  handleDrawerToggle = (temporaryOnly) => {
    if (temporaryOnly == null || (temporaryOnly && this.state.drawerProps.variant === 'temporary')) {
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
    const { classes, theme, disableContainer, children } = this.props;

    if (typeof(children) === 'function') {
      const childrenResult = children({
        getAppBarProps: this.getAppBarProps,
        getContentProps: this.getContentProps,
        getDrawerProps: this.getDrawerProps,
        toggleDrawer: this.handleDrawerToggle
      })

      return (
        disableContainer ? (
          childrenResult
        ) : (
          <div className={classNames(classes.content, { [classes.contentShift]: this.state.drawerProps.open })}>
            { childrenResult }
          </div>
        )
      )
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
  disableContainer: PropTypes.bool,
};

export default withStyles(styles, { withTheme: true })(AppContainer);