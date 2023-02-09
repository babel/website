import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import "../../static/css/team.css";

const Banner = () => {
  return (
    <div className="mainContainer">
      <div className="page-header text-center">
        <h1>Meet the Team</h1>
        <p>
          <a
            href="https://github.com/babel/website/blob/main/website/data/team.yml"
            target="_blank"
            rel="noreferrer noopener"
          >
            Edit this page
          </a>
        </p>
      </div>
    </div>
  );
};

const MemberOrgList = props => {
  if (props.orgs) {
    const elements = props.orgs.map(org => {
      return (
        <a
          key={org}
          href={`https://www.github.com/${org}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className="org_image">
            <img
              title={org}
              alt={org}
              src={`https://avatars.githubusercontent.com/${org}`}
            />
          </div>
        </a>
      );
    });
    return <div className="member_orgs">{elements}</div>;
  } else return null;
};

const MemberAreaList = props => {
  if (props.areas) {
    const areaElements = props.areas.map(area => {
      return (
        <a
          key={area}
          href={`https://www.github.com/babel/${area}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          🌐
        </a>
      );
    });
    return <div className="member_orgs">{areaElements}</div>;
  } else return null;
};

const MediaLink = props => {
  if (props.text) {
    return (
      <div className={"media-link " + props.icon}>
        <a href={props.url} target="_blank" rel="noreferrer noopener">{props.text}</a>
      </div>
    );
  } else return null;
};

const MediaObject = ({ member }) => {
  const { github, twitter, name, orgs, areas } = member;
  const avatarUrl = `https://avatars.githubusercontent.com/${github}`;
  const twitterUrl = `https://twitter.com/${twitter}`;
  const githubUrl = `https://github.com/${github}`;
  return (
    <div className="team_member">
      <div className="member_avatar">
        <img src={avatarUrl} height="80" width="80" alt="{{name}}" />
      </div>
      <div className="member_info">
        <div style={{ fontWeight: 600 }}>{name}</div>
        <MediaLink
          icon="github"
          url={githubUrl}
          text={github}
        />
        <MediaLink
          icon="twitter"
          url={twitterUrl}
          text={twitter}
        />
        <MemberOrgList orgs={orgs} />
        <MemberAreaList areas={areas} />
      </div>
    </div>
  );
};

const MemberSection = props => {
  return (
    <div>
      <h2 className="member_type">{props.title}</h2>
      <div className="member_block">
        {props.members.map(member => {
          return <MediaObject key={member.github} member={member} />;
        })}
      </div>
    </div>
  );
};

const Team = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    customFields: { team },
  } = siteConfig;

  return (
    <Layout title={siteConfig?.title} description={siteConfig?.tagline}>
      <Banner />
      <div className="wrapper">
        <MemberSection title="Core Maintainers" members={team.core} />
        <MemberSection title="Team Members" members={team.members} />
        <MemberSection title="Summer of Code" members={team.summerOfCode} />
        <MemberSection title="NonHuman Members" members={team.nonHumanMember} />
        <MemberSection title="Alumni" members={team.alumnus} />
      </div>
    </Layout>
  );
};

export default Team;
