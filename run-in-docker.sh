#!/bin/bash
set -exo pipefail

cd "$(dirname ${BASH_SOURCE})"

maven_cache_repo="${HOME}/.m2/repository"

mkdir -p "${maven_cache_repo}"

docker run --rm -it \
        -w /work \
        -e GEN_DIR=/work \
        -e MAVEN_CONFIG=/var/maven/.m2 \
        -u "$(id -u):$(id -g)" \
        -v "${PWD}:/work" \
        -v "${maven_cache_repo}:/var/maven/.m2/repository" \
        --entrypoint /work/docker-entrypoint.sh \
        maven:3-jdk-8 "$@"
