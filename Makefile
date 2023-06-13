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
