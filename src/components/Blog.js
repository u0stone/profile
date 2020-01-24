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
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
//import post3 from './blog-post.3.md';

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: 'Interests', url: '/interest' },
  { title: 'Health', url: '/health' },
  { title: 'Style', url: '/style' },
  { title: 'Travel', url: '/travel' },
];

const mainFeaturedPost = {
  title: 'I am mostily wondering WHY first, then HOW.',
  description:
    "Since I have started Web Programming, most of things are totally new to me. Every "
    +"moments when I start new language or framework, it wasn't easy at all. I studied "
    +"by myself. However, when I recognize why is it useful then things getting easier.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
  url:'/mainitem',
};

const featuredPosts = [
  {
    title: 'Profile',
    date: 'Feb 2020',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    url:'/subitem1'
  },
  {
    title: 'Interests',
    date: 'Feb 2020',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
    url:'/subitem2'
  },
];

const posts = [post1, post2];//, post3];

const sidebar = {
  title: 'About Me',
  description:
    'I have good talent of programming. I graduated from University middle of economy crisis of '
    +'South Korea, but I easly got a job without any help. I worked as Embedded Software Programmer '
    +'for 6 years. I was totally burn-out after then. That is one of the biggest reason to move to Canada '
    +'I ran my own businesses successfuly for 10 years in Canada, and made good fortune too. However I\'ve never '
    +'stopped study programming. When I sold me last business, I decided to work as programmer. '
    +'However, what I used to do is almost extincted. Web Programming is what I choose so. I studied JSP, PHP '
    +'to learn how sever-client works. After then, Java Script, Node.JS. I registered SAIT collage in that moment. Their culiculums '
    +'are focused on Microsfot Envelonment and SQL. It is easy to learn and use, but I\'d like to keep studing JS, REACT, '
    +'and so many other open sources. I am person who can find own right way well. I had successful Embedded Programmer '
    +'career. I managed my businesses successfully. I am fully ready to work and using what I\'ve studied.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon, url:'#' },
    { name: 'LinkedIn', icon: LinkedInIcon, url:'#' },
    { name: 'Facebook', icon: FacebookIcon, url:'#' },
  ],
};

export default function Blog() {
  const classes = useStyles();

  return (
    <React.Fragment> {/* frank: This allow have multiple elements return. ShortHand <></>. Same as <div>, If only one return. */}
      <CssBaseline />  {/* frank: Nomalize CSS Style 초기화 */}
      <Container maxWidth="lg"> {/* frank: Most basic layout Element. Center contents horizontally. */}
        <Header title="Frank's Profile and Portfolio" sections={sections} />  {/** Title and Top Menu */}
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Portfolio" posts={posts} />

            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}
//            <Main title="From the firehose" posts={posts} />