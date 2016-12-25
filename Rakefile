require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :allow_hash_href => true,
    :alt_ignore => [/.+/],
    :assume_extension => true,
    #:check_html => true,
    :disable_external => true,
    :empty_alt_ignore => true,
    :only_4xx => true,
  }).run
end

task :default => :test
