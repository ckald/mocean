# Replaces multiple newlines and whitespace
# between them with one newline

module Jekyll
  class StripTag < Liquid::Block

    def render(context)
      super.gsub /\n\s*\n/, "\n"
    end

  end

  class StripSpaceTag < Liquid::Block
    def render(context)
      super.gsub /\s*/, " "
    end
  end
end

Liquid::Template.register_tag('strip', Jekyll::StripTag)
Liquid::Template.register_tag('strip-space', Jekyll::StripSpaceTag)
