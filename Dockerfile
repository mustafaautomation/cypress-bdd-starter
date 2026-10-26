FROM cypress/included:16.2.0

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# Default: run all tests. Override with: docker run <image> --expose tags=@smoke
ENTRYPOINT ["npx", "cypress", "run"]
