import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const styles = theme => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const useStyles = makeStyles(theme => ({
  postItem: {
    position: 'relative',
    backgroundColor: '#f0f0f0', //theme.palette.grey[800],
    //color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  }
}));

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h5',
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h6' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'subtitle1' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

export default function Markdown(props) {
  const classes = useStyles();
  return( 
  <Paper className={classes.postItem}>   {/**<div style={{backgroundColor: 'silver', padding:10, margin: 10}}>    Frank: markup부분 보여주는곳 일단 padding, margin 색 추가만 했음  */}
    <ReactMarkdown options={options} {...props} />                   {/** <div> 말고 뭔가 다른 좀더 예쁜걸로 바꿔야할듯. */}
  </Paper>
  )
}
