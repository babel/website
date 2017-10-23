---
layout: page
title: Meet the Team
# description:
permalink: /team/
---

<div class="container team">
  <div class="row">
    <h3 class="team__name">Core Team</h3>
    {% for member in site.data.team.core %}
      <div class="col-md-3 col-sm-4 col-xs-12 team__member">
        <img class="member__image" alt="{{member.name}}" src="https://twitter.com/{{member.twitter}}/profile_image?size=original"/>
          <p>{{ member.name }}</p>
          <p>{% include icons/github.svg %}<a href="//www.github.com/{{member.github}}" target="_blank">{{member.github}}</a></p>
          <p>{% include icons/twitter.svg %}<a href="//www.twitter.com/{{member.twitter}}" target="_blank">{{member.twitter}}</a></p>
      </div>
    {% endfor %}
  </div>

  <div class="row">
    <h3 class="team__name">Members</h3>
    {% for member in site.data.team.members %}
      <div class="col-md-3 col-sm-4 col-xs-12 team__member">
        <img class="member__image" alt="{{member.name}}" src="https://twitter.com/{{member.twitter}}/profile_image?size=original"/>
          <p>{{ member.name }}</p>
          <p>{% include icons/github.svg %}<a href="//www.github.com/{{member.github}}" target="_blank">{{member.github}}</a></p>
          <p>{% include icons/twitter.svg %}<a href="//www.twitter.com/{{member.twitter}}" target="_blank">{{member.twitter}}</a></p>
      </div>
    {% endfor %}
  </div>

  <div class="row">
    <h3 class="team__name">Non-Human Members</h3>
    {% for member in site.data.team.non-human-member %}
      <div class="col-md-3 col-sm-4 col-xs-12 team__member">
        <img class="member__image" alt="{{member.name}}" src="https://twitter.com/{{member.twitter}}/profile_image?size=original"/>
          <p>{{ member.name }}</p>
          <p>{% include icons/github.svg %}<a href="//www.github.com/{{member.github}}" target="_blank">{{member.github}}</a></p>
          <p>{% include icons/twitter.svg %}<a href="//www.twitter.com/{{member.twitter}}" target="_blank">{{member.twitter}}</a></p>
      </div>
    {% endfor %}
  </div>

  <div class="row">
    <h3 class="team__name">Inactive members</h3>
    {% for member in site.data.team.alumnus %}
      <div class="col-md-3 col-sm-4 col-xs-12 team__member">
        <img class="member__image" alt="{{member.name}}" src="https://twitter.com/{{member.twitter}}/profile_image?size=original"/>
          <p>{{ member.name }}</p>
          <p>{% include icons/github.svg %}<a href="//www.github.com/{{member.github}}" target="_blank">{{member.github}}</a></p>
          <p>{% include icons/twitter.svg %}<a href="//www.twitter.com/{{member.twitter}}" target="_blank">{{member.twitter}}</a></p>
      </div>
    {% endfor %}
  </div>

</div>
