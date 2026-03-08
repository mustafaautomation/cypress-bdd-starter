FROM cypress/included:13.17.0

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

ENTRYPOINT ["npx", "cypress", "run"]
