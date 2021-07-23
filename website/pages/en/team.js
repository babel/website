const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

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
      <div>
        <img
          style={{ marginRight: 4 }}
          height={props.size}
          width={props.size}
          src={props.iconSource}
          alt={props.iconAlt}
        />
        <a href={props.url} target="_blank" rel="noreferrer noopener">
          <span className="anchor_text">{props.text}</span>
        </a>
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
          iconAlt="github"
          iconSource="/img/icons/github.svg"
          size="16"
          url={githubUrl}
          text={github}
        />
        <MediaLink
          iconAlt="twitter"
          iconSource="/img/icons/twitter.svg"
          size="16"
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

class Team extends React.Component {
  render() {
    const team = siteConfig.team;
    return (
      <div>
        <Banner />
        <Container padding={["bottom"]}>
          <div>
            <MemberSection title="Core Maintainers" members={team.core} />
            <MemberSection title="Team Members" members={team.members} />
            <MemberSection title="Summer of Code" members={team.summerOfCode} />
            <MemberSection
              title="NonHuman Members"
              members={team.nonHumanMember}
            />
            <MemberSection title="Alumni" members={team.alumnus} />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Team;
