#!/usr/bin/env ruby

require 'fileutils'
require 'tmpdir'
require 'date'

puts "Making sure that build exists..."

%x( git checkout -b gh-pages )

# This will be the folder name for this specific build in the /temp directory
build_name = "build.techhigh.us:#{Date.today.to_time.to_i}"
tmp_dir = ""

puts "Building #{build_name}"

%x( jekyll build )

# Copy built site to temp directory
Dir.mktmpdir do |dir|
    FileUtils.copy_entry("./_site", "#{dir}/#{build_name}")

    # Stash all uncommitted changes since we have to switch branches
    puts "Stashing changes..."
    %x( git stash push -a )

    puts "Switching to build branch..."
    %x( git checkout gh-pages )

    puts "Cleaning branch..."
    FileUtils.rm_rf Dir.glob("./*")

    puts "Copying build..."
    FileUtils.copy_entry("#{dir}/#{build_name}", ".")
end

puts "Committing and pushing..."
%x( git add -A )

# Force push since we dont value the history of our build branch
%x( git push origin gh-pages --force )

%x( git commit -m "Update Pages" )

%x( git checkout main )

%x( git stash pop )

puts "All done!"





