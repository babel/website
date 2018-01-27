const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");
const GridBlock = CompLibrary.GridBlock;
const Container = CompLibrary.Container;

const siteConfig = require(process.cwd() + "/siteConfig.js");

const Banner = props => {
  return (
    <div className="mainContainer">
      <div className="page_header">
        <h1>Meet the Team</h1>
        <p>
          <a
            href="https://github.com/babel/website/blob/master/team.md"
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

const MediaObject = props => {
  const avatarUrl = `https://avatars.githubusercontent.com/${props.member
    .github}`;
  const twitterUrl = `https://twitter.com/${props.member.twitter}`;
  const githubUrl = `https://github.com/${props.member.github}`;
  return (
    <div className="team_member">
      <div className="member_avatar">
        <img src={avatarUrl} height="80" width="80" alt="{{member.name}}" />
      </div>
      <div className="member_info">
        <div style={{ fontWeight: 600 }}>{props.member.name}</div>
        <MediaLink
          iconAlt="github"
          iconSource="/img/icons/github.svg"
          size="16"
          url={githubUrl}
          text={props.member.github}
        />
        <MediaLink
          iconAlt="twitter"
          iconSource="/img/icons/twitter.svg"
          size="16"
          url={twitterUrl}
          text={props.member.twitter}
        />
        <div className="member_orgs">
          {props.member.orgs
            ? props.member.orgs.map(org => {
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
              })
            : null}
          {props.member.areas
            ? props.member.areas.map(area => {
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
              })
            : null}
        </div>
      </div>
    </div>
  );
};

const MemberSection = props => {
  return (
    <div>
      <h2>{props.title}</h2>
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
        <Container padding={["bottom", "right", "left"]}>
          <div>
            <MemberSection title="Core contributors" members={team.core} />
            <MemberSection title="Members" members={team.members} />
            <MemberSection title="Summer of Code" members={team.summerOfCode} />
            <MemberSection
              title="NonHuman Members"
              members={team.nonHumanMember}
            />
            <MemberSection title="Inactive members" members={team.alumnus} />
          </div>
        </Container>
      </div>
    );
  }
}

module.exports = Team;
