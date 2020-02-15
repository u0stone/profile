import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
	},
	btnHover:{
		'&:hover': { margin:"-0.5px", border: '0.5px solid', borderRadius: 3, borderColor: "#aaf", },		
	}

}));

export default function Header(props) {
	const classes = useStyles();
	const { sections, title } = props;

	return (
		<React.Fragment>
			<Toolbar className={classes.toolbar}>  
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
			</Toolbar>
			<Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
				{sections.map(section => (
					<React.Fragment key={section.title} >
						{ section.url.search(".html") < 0 ?
							<Link component={RouterLink} to={section.url} style={{ textDecoration: 'none' }}>
								<Button color="default" className={classes.btnHover}>{section.title}</Button>
							</Link>
							:
							<Link href={section.url} style={{ textDecoration: 'none' }}>
								<Button color="default" className={classes.btnHover}>{section.title}</Button>
							</Link>
						}
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
