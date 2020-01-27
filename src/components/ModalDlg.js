import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
    content: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    closeButton: {
        position: 'absolute',
        top:'0px',
        right:'0px',
        //marginLeft: 'auto'
    },
    paper: {
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
  },
}));

export default function ServerModal(props) {
    const{onClose, open, title, desc} = props;
    const classes = useStyles();

    const handleClose = ()=>onClose();

    return (
        <Dialog TransitionComponent={Transition} onClose={handleClose} aria-labelledby="dialog-title" open={open}>
            <Paper  elevation={0} className={classes.content}>
                <DialogTitle id="dialog-title">
                    {title}
                    <IconButton className={classes.closeButton} color="inherit" onClick={onClose}>
                        <CloseIcon/>
                    </IconButton>
                </DialogTitle>
                
                <Typography> {desc} </Typography>
            </Paper>
        </Dialog>
    );
}
ServerModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    desc: PropTypes.string
};