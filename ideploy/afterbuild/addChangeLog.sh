cp config_tmp.yml config.yml
git log --pretty=format:"changelog: %s" -1 >> config.yml

