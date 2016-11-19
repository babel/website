=begin
  Includes Babel's package readme

  Usage:
    {% include_package_readme %}
=end
module Jekyll

  class MarkdownTag < Liquid::Tag

    def render(context)
      package = context["page"]["package"].to_s

      content = File.read File.join Dir.pwd, "_includes/babel/packages/", package, "README.md"

      # Drop the header
      content.split("\n").drop(3).join("\n")
    end

  end
end

Liquid::Template.register_tag('include_package_readme', Jekyll::MarkdownTag)
