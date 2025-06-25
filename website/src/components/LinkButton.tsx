import React from "react";
import Link from "@docusaurus/Link";

export default class LinkButton extends React.Component<{
  href: string;
  target?: string;
  children: React.ReactNode;
}> {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <Link
          className="button"
          to={this.props.href}
          target={this.props.target || "_self"}
        >
          {this.props.children}
        </Link>
      </div>
    );
  }
}
