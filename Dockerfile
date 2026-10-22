# =============================================================================
# Target: "base"
FROM node:24-alpine AS base

# Upgrade system packages and install runtime dependencies.
RUN apk --no-cache --update upgrade \
    && apk --no-cache add \
        ca-certificates \
    && rm -rf /var/cache/apk/*

# Setup the application user and group
RUN addgroup -Sg 40023 waam && \
    adduser -Su 40023 -G waam waam && \
    install -d -o waam -g waam /usr/src/app && \
    mkdir -p /opt/app/artifacts && \
    chown -R waam:waam /opt/app

# Subsequent commands run relative to this directory.
WORKDIR /usr/src/app

# Subsequent commands run as this non-root user.
USER waam

FROM base AS build

# Use the repository's pinned Yarn version and node-modules linker.
COPY --chown=waam .yarnrc.yml ./
COPY --chown=waam .yarn/releases/ ./.yarn/releases/
COPY --chown=waam .yarn/plugins/ ./.yarn/plugins/

# Install server dependencies.
COPY --chown=waam package.json ./
COPY --chown=waam yarn.lock ./
RUN node .yarn/releases/yarn-3.6.1.cjs install --immutable

# Install client dependencies.
COPY --chown=waam ./client/package.json ./client/
COPY --chown=waam ./client/yarn.lock ./client/
COPY --chown=waam ./client/.yarnrc.yml ./client/
RUN cd /usr/src/app/client && node ../.yarn/releases/yarn-3.6.1.cjs install --immutable

# Build the client.
COPY --chown=waam ./client/ ./client/
RUN cd /usr/src/app/client && node ../.yarn/releases/yarn-3.6.1.cjs run build

# Keep build tooling and development dependencies out of the runtime image.
RUN node .yarn/releases/yarn-3.6.1.cjs workspaces focus --all --production

FROM base AS runtime
COPY --from=build --chown=waam /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=waam /usr/src/app/client/build ./client/build
COPY --chown=waam package.json server.js initDockerSecrets.js ./
COPY --chown=waam server/ ./server/
COPY --chown=waam bin/ ./bin/

# Set node as the entrypoint.
ENTRYPOINT ["npm"]

# The default command runs the server.
CMD ["run", "server"]

ENV PATH=/usr/src/app/bin:$PATH
RUN ln -s /opt/app/artifacts artifacts
