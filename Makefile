setup:
	npm install -g pnpm @bazel/bazelisk @bazel/buildifier && \
	pnpm install && \
	bazel version


test:
	bazel test //...

build:
	bazel build //...

lint:
	npx prettier --check "**"

dev:
	docker-compose -f docker-compose.yaml up --build --no-log-prefix
