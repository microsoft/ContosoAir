#
# ---- Base Node ----
FROM node:8.15-jessie AS dependencies
WORKDIR /cache/
COPY package.json .
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 

# ---- Release ----
FROM node:8.15-alpine AS release
# copy production node_modules
COPY --from=dependencies /cache/ .
# copy app sources
COPY . .
# expose port and define CMD
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["npm", "start"]