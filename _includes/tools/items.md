{% for tool in site.data.tools %}
  {% for item in tool.items %}
    <div class="item" data-name="{{item[0]}}">
      <h3>{{item[1]}}</h3>
      {% capture template_name %}tools/{{item[0]}}/{{include.name}}.md{% endcapture %}
      {% capture template %}{% include {{template_name}} %}{% endcapture %}
      {{ template | markdownify }}
    </div>
  {% endfor %}
{% endfor %}
