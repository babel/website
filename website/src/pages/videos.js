import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "../../static/css/video.css";
import Layout from "@theme/Layout";

const VideosItem = props => {
  return (
    <div className="babel-videos">
      <div className="babel-video-play">
        <iframe src={props.video.link} allowFullScreen />
      </div>
      <div className="babel-video-block">
        <h4 id="babel-video-title">{props.video.title}</h4>
        <CategoryInfo video={props.video} />
      </div>
    </div>
  );
};

const CategoryInfo = props => {
  const authors = props.video.authors || [
    { name: props.video.author, link: props.video.author_link },
  ];

  return (
    <p className="text-muted">
      {" by "}
      <AuthorLinks authors={authors} />
      {" at "}
      <CategoryLink
        event_link={props.video.event_link}
        event={props.video.event}
      />
      <time dateTime={props.video.year}>{` (${props.video.year})`}</time>
    </p>
  );
};

const AuthorLinks = props => {
  const links = props.authors
    .map(author => (
      <CategoryLink
        author_link={author.link}
        author={author.name}
        key={author.link}
      />
    ))
    .reduce((left, right) => [left, " and ", right]);

  return <span>{links}</span>;
};

const CategoryLink = props => {
  const link = props.author_link || props.event_link;
  const content = props.author || props.event;
  return (
    <a href={link} target="_blank" rel="noreferrer noopener">
      {content}
    </a>
  );
};

const Videos = () => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  const showcase = customFields.videos.map((category, i) => {
    function compare(property) {
      return function(a, b) {
        const value1 = a[property];
        const value2 = b[property];
        return value2 - value1;
      };
    }
    const videos = category.items.sort(compare("year")).map((video, j) => {
      return <VideosItem key={j} video={video} />;
    });
    return (
      <div className="videos-container" key={i}>
        <h2>{category.category}</h2>
        {videos}
      </div>
    );
  });

  return (
    <Layout title={siteConfig?.title} description={siteConfig?.tagline}>
      <div className="mainContainer">
        <div className="page-header text-center">
          <h1>Videos</h1>
          <p className="lead">
            Videos and podcasts about Babel and its underlying concepts.
          </p>
        </div>
        {/* <Container padding={["bottom"]}> */}
        <div className="wrapper"> {showcase}</div>
        {/* </Container> */}
      </div>
    </Layout>
  );
};

export default Videos;
