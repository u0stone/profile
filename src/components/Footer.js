import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(1, 0),
  },
}));

export default function Footer(props) {
  const classes = useStyles();
  const { email, title } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          mail to : <a href="mailto:you.frank@yahoo.com" target="_top">you.frank@yahoo.com</a>
        </Typography>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};
