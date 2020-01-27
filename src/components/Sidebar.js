import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ModalDlg from './ModalDlg';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
}));

export default function Sidebar(props) {
    const { archives, description, social, title } = props;
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = value => {
      setOpen(false);
    };


    return (
      <Grid item xs={12} md={4}>
          <Paper elevation={0} className={classes.sidebarAboutBox}>
              <Typography variant="h6" gutterBottom>
                  {title}
              </Typography>
          
              <Typography>
                  {description.substring(0, 250)+"..."}
              </Typography>
              <Typography  color="primary"  >
                  <Link href="#">
                      <Button color="primary" onClick={handleClickOpen}>
                          Continue reading...
                      </Button>
                      <ModalDlg open={open} onClose={handleClose} title={title} desc={description}/>                
                  </Link>
              </Typography>
          </Paper>
          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
              Social
          </Typography>
          {social.map(network => (
              <Link display="block" variant="body1" href={network.url} key={network}>
                  <Grid container direction="row" spacing={1} alignItems="center">
                      <Grid item>
                          <network.icon />
                      </Grid>
                      <Grid item>{network.name}</Grid>
                  </Grid>
              </Link>
          ))}
        </Grid>
    );
}

Sidebar.propTypes = {
  archives: PropTypes.array,
  description: PropTypes.string,
  social: PropTypes.array,
  title: PropTypes.string,
};
