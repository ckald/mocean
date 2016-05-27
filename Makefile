all: clean build
# publish

clean:
	rm -rf _site _publish

build:
	jekyll build  --config _config.yml,_config_publish.yml

# publish:
