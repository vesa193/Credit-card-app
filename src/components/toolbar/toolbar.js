import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ToolbarComponent = ({ history }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar variant="dense">
      <IconButton color="inherit" aria-label="menu">
        <ArrowBackIcon fontSize="default" onClick={ () => history.goBack() } />
      </IconButton>
      </Toolbar>
    </AppBar>
  );
}
 
export default ToolbarComponent;