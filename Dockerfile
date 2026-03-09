FROM cypress/included:13.17.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Default: run all tests. Override with: docker run <image> --env tags=@smoke
ENTRYPOINT ["npx", "cypress", "run"]
