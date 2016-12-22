require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    :allow_hash_href => true,
    :assume_extension => true,
    :disable_external => true,
    :only_4xx => true,
  }).run
end

task :default => :test
