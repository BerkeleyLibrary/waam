# =============================================================================
# Target: "base"
FROM node:16-alpine

# Upgrade system packages and install runtime dependencies.
RUN apk --no-cache --update upgrade \
    && apk --no-cache add \
        ca-certificates \
    && rm -rf /var/cache/apk/*

# To overcome permission issues when installing global deps: https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#global-npm-dependencies
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# Setup the application user and group
RUN addgroup -Sg 40023 waam && \
    adduser -Su 40023 -G waam waam && \
    install -d -o waam -g waam /usr/src/app && \
    mkdir -p /opt/app/artifacts && \
    chown -R waam:waam /opt/app

# Subsequent commands run relative to this directory.
WORKDIR /usr/src/app

RUN chown -Rh waam:waam /home/node
# Subsequent commands run as this non-root user.
USER waam

# Install Yarn
RUN npm i -g corepack

# Install server dependencies.
COPY --chown=waam package.json ./
COPY --chown=waam yarn.lock ./
RUN yarn install

# Install client dependencies.
COPY --chown=waam ./client/package.json ./client/
COPY --chown=waam ./client/yarn.lock ./client/
RUN cd /usr/src/app/client && yarn install

# Build the client.
COPY --chown=waam ./client/ ./client/
RUN cd /usr/src/app/client && yarn run build

# Copy the rest of the codebase.
COPY --chown=waam . .

# Set node as the entrypoint.
ENTRYPOINT ["npm"]

# The default command runs the server.
CMD ["run", "server"]

ENV PATH=/usr/src/app/bin:$PATH
RUN ln -s /opt/app/artifacts artifacts
