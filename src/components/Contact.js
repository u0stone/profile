import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom'; 
//import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import EmailTwoTone from '@material-ui/icons/EmailTwoTone';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import emailjs from 'emailjs-com';
import { emailJs_svcId, emailJsTplId, emailJsUid } from '../../api.config' 
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
}));

export default function Contact() {
    const classes = useStyles();
    const [email, setEmail] = React.useState();
    const [yourname, setYourName] = React.useState();
    const [content, setContent] = React.useState();
    const [openDlg, setOpenDlg] = React.useState(false);

    const emailChange = event => {
        setEmail(event.target.value);
    };
    const yournameChange = event => {
        setYourName(event.target.value);
    };
    const contentChange = event => {
        setContent(event.target.value);
    };

    const sendEmail=()=>{
        var templateParams = {
            from_name: yourname,
            reply_to: email,
            message_html: content
        };
        
        emailjs.send(emailJs_svcId, emailJsTplId, templateParams, emailJsUid)
        .then((result) => {
            console.log(result.text);
            setEmail('');
            setYourName('');
            setContent('');
            setOpenDlg(true);
        }, (error) => {
            console.log(error.text);
        });

    }
    const handleCloseDlg = () => {
      setOpenDlg(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <EmailTwoTone />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Send Email
                </Typography>

                <ValidatorForm  className={classes.form} onSubmit={sendEmail} onError={errors => console.log(errors)}>
                    <TextValidator
                        variant="outlined" margin="normal"  name="email" fullWidth 
                        label="Your Email Address" autoComplete="email" autoFocus onChange={emailChange}
                        validators={['required', 'isEmail']} value={email}
                        errorMessages={['this field is required', 'email is not valid']}
                    />

                    <TextValidator 
                        variant="outlined" margin="normal" fullWidth id="yourname"
                        label="Your Name" name="yourname" autoComplete="Your Name" onChange={yournameChange}
                        validators={['required']} value={yourname}
                        errorMessages={['this field is required']}
                    />

                    <TextValidator
                        variant="outlined" margin="normal"  fullWidth
                        id="content" label="Content" name="content" autoComplete="Content"
                        multiline rows = "5" rowsMax = "10" onChange={contentChange}
                        validators={['required']} value={content}
                        errorMessages={['this field is required']}
                    />

                    <Button type="submit" fullWidth variant="contained" 
                      color="primary" className={classes.submit} >
                        Send
                    </Button>

                    <Link component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
                        <Button type="button" fullWidth variant="contained" 
                          color="secondary" className={classes.submit}>
                            Back to Home
                        </Button>
                    </Link>
                </ValidatorForm>
            </div>

            <Dialog
                open={openDlg}
                onClose={handleCloseDlg}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Thank you for Email"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Email sent successfully.
                    </DialogContentText>
                </DialogContent>

                <Link component={RouterLink} to="/" style={{ textDecoration: 'none' }}>
                    <Button type="button" fullWidth variant="contained" 
                      color="primary" className={classes.submit}>
                        Back to Home
                    </Button>
                </Link>

            </Dialog>
        </Container>
    );
}
