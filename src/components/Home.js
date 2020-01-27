import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
//import TwitterIcon from '@material-ui/icons/LinkedIn';//'@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Header from './Header';
import MainTitleImage from './MainTitleImage';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import portfolio1 from './Portfolio1.md';
import portfolio2 from './Portfolio2.md';
//import post3 from './blog-post.3.md';

const useStyles = makeStyles(theme => ({
	mainGrid: {
		marginTop: theme.spacing(3)
	}
}));

const sections = [
	{ title: 'Resume', url: '/resume' },
	{ title: 'Email to Frank', url: '/contact' },
/*	{ title: 'Style', url: '/style' },
	{ title: 'Travel', url: '/travel' }*/
];

const mainTitleImage = {
	title: 'Happiness lies in the joy of achievement and the thrill of creative effort.',
  description:
    'I like imagination, but I profer to create something from it. '+
    'Programming is a joyful tool to achieve it for me.',
	image: 'https://source.unsplash.com/random/?texture',
	imgText: 'main image description'
	//  linkText: 'Continue reading…',
	//  url:'/mainitem',
};

const featuredPosts = [
	{
		title: 'Profile',
		date: 'Feb 2020',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.',
		image: 'https://source.unsplash.com/random/?people, man',
		imageText: 'Image Text',
		url: '/subitem1'
	},
	{
		title: 'Interests',
		date: 'Feb 2020',
		description:
			'This is a wider card with supporting text below as a natural lead-in to additional content.',
		image: 'https://source.unsplash.com/random/?nature',
		imageText: 'Image Text',
		url: '/subitem2'
	}
];

const portfolios = [portfolio1, portfolio2]; //, post3];

const sidebar = {
	title: 'About Me',
  description:
    'I have a good talent for programming, I graduated from University in the middle of an economic ' +
    'crisis in South Korea, but I easily got a job without any help. I worked as an Embedded Software ' +
    'Programmer for 6 years. I was a total burn-out after then, that is one of the biggest reasons to ' +
    'move to Canada. I ran my own businesses successfully for 10 years in Canada and made a good fortune ' +
    'too. However, I\'ve never stopped studying programming. When I sold my last business, I decided to ' +
    'work as a programmer However, what I used to do is almost extinct. Web Programming is what I choose ' +
    'so. I studied JSP, PHP to learn how sever-client works, after then, JavaScript and Node. I registered ' +
    'at SAIT college at that moment. Their curriculums are focused on Microsoft Environment and SQL they ' +
    'are easy to learn and use, but I\'d like to keep studying JS, REACT, and so many other open sources. ' +
    'I am a person that can find my own right way well. I had a successful Embedded Programmer career. ' +
    'I managed my businesses successfully, I am fully ready to work and use what I\'ve studied.',
	social: [
		{ name: 'GitHub', icon: GitHubIcon, url: 'https://github.com/u0stone?tab=repositories' },
		{ name: 'LinkedIn', icon: LinkedInIcon, url: '#' },
		{ name: 'Facebook', icon: FacebookIcon, url: '#' }
	]
};

export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            
            {/* frank: This allow have multiple elements return. ShortHand <></>. Same as <div>, If only one return. */}
            <CssBaseline /> {/* frank: Nomalize CSS Style 초기화 */}
            <Container maxWidth="lg">
                
                {/* frank: Most basic layout Element. Center contents horizontally. */}
                <Header
                    title="Frank's Profile and Portfolio"
                    sections={sections}
                /> 
                {/** Title and Top Menu */}
                <main>
                    <MainTitleImage post={mainTitleImage} />
                    <Grid container spacing={4}>
                        {featuredPosts.map(post => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid>
                   <Grid container spacing={5} className={classes.mainGrid}>
                         <Main title="Portfolios" posts={portfolios} /> {/** 여기에 두개 */}

                        <Sidebar
                            title={sidebar.title}
                            description={sidebar.description}
                            social={sidebar.social}
                        />

                    </Grid>
                </main>
            </Container>
            <Footer
                title="FRANK"
                email="u0stone@yahoo.com"
            />
        </React.Fragment>
    );
}

