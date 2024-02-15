const { defineConfig } = require("cypress");
const axios = require("axios");
const _ = require("lodash");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3001",
  },
  e2e: {
    setupNodeEvents(on, config) {
      const testDataApiEndpoint = `${config.env.apiUrl}/testData`;
      const queryDatabase = ({ entity, query }, callback) => {
        const fetchData = async (attrs) => {
          const { data } = await axios.get(`${testDataApiEndpoint}/${entity}`);
          return callback(data, attrs);
        };
        return Array.isArray(query)
          ? Promise.map(query, fetchData)
          : fetchData(query);
      };
      on("task", {
        async "db:seed"() {
          // seed database with test data
          const { data } = await axios.post(`${testDataApiEndpoint}/seed`);
          return data;
        },
        "filter:database"(queryPayload) {
          return queryDatabase(queryPayload, (data, attrs) =>
            _.filter(data.results, attrs)
          );
        },
      });
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    experimentalRunAllSpecs: true,
  },
});
