import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	toolbar: {
		borderBottom: `1px solid ${theme.palette.divider}`
	},
	toolbarTitle: {
		flex: 1
	},
	toolbarSecondary: {
		justifyContent: 'flex-start', //'space-between',

		overflowX: 'auto'
	},
	toolbarLink: {
		padding: theme.spacing(1),
		flexShrink: 0
	}
}));

export default function Header(props) {
	const classes = useStyles();
	const { sections, title } = props;

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>
				{/*<Button size="small">Subscribe</Button> Frank: 불필요해서 뺐음 */}
				<Typography
					component="h2"
					variant="h4"
					color="inherit"
					align="center"
					noWrap
					className={classes.toolbarTitle}
				>
					{title}
				</Typography>
				{/**  Frank: 불필요해서 뺐음.
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
         */}
			</Toolbar>
			<Toolbar
				component="nav"
				variant="dense"
				className={classes.toolbarSecondary}
			>
				{sections.map(section => (
					<React.Fragment key={section.title} >
						{/**
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
             */}
						<Link component={RouterLink} to={section.url}>
							<Button>{section.title}</Button>
						</Link>{' '}
						<div key={section.url}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
					</React.Fragment>
				))}
			</Toolbar>
		</React.Fragment>
	);
}

Header.propTypes = {
	sections: PropTypes.array,
	title: PropTypes.string
};
