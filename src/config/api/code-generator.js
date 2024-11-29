/* eslint-disable @typescript-eslint/no-require-imports */
const { default: axios } = require('axios')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const removeDir = function (dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    if (files.length <= 1) return;
    const directories = files.filter((file) => file !== ".gitkeep");

    directories.forEach((filename) => {
      const filePath = path.join(dirPath, filename);
      if (fs.statSync(filePath).isDirectory()) {
        removeDir(filePath);
      } else {
        fs.unlinkSync(filePath);
      }
    });

    fs.rmdirSync(dirPath, { recursive: true, force: true });
  } else {
    console.log("Directory path not found.");
  }
};

// Helper function to extract schema references recursively
const extractSchemaReferences = (obj, schemas, refs = new Set()) => {
  // eslint-disable-next-line func-style
  function findRefs(value) {
    if (typeof value !== "object" || value === null) return;

    if (value.$ref) {
      const refName = value.$ref.replace("#/components/schemas/", "");
      if (!refs.has(refName)) {
        refs.add(refName);
        // Recursively find references within the referenced schema
        if (schemas[refName]) {
          findRefs(schemas[refName]);
        }
      }
    }

    for (const key in value) {
      // eslint-disable-next-line no-prototype-builtins
      if (value.hasOwnProperty(key)) {
        findRefs(value[key]);
      }
    }
  }

  findRefs(obj);
  return refs;
};

// Helper function to filter schemas
const filterSchemas = (schemas, refs) => {
  const filteredSchemas = {};
  refs.forEach((ref) => {
    if (schemas[ref]) {
      filteredSchemas[ref] = schemas[ref];
    }
  });
  return filteredSchemas;
};

const codeGenerator = async (baseURL, idsBaseURL, destination) => {
  const orvalConfigPath = path.resolve(
    __dirname,
    `${destination}/services/orval.config.js`
  );
  const generatedServicesPath = path.resolve(
    __dirname,
    `${destination}/services`
  );
  const customInstancePath = path.resolve(
    __dirname,
    `${destination}/config/api/custom-instance.ts`
  );

  try {
    removeDir(generatedServicesPath);

    const configs = [];
    const definition = {
      url: "https://api.barchinet.com:8443/swagger/architects/swagger.json",
      name: "architect",
    };

    console.log(definition)


    const response = await axios.get(definition.url);
    console.log(response)
    const definitionName = definition.name;
    const outputPath = `${generatedServicesPath}/${definitionName}-services/`;

    fs.mkdirSync(outputPath, { recursive: true });

    const paths = response.data.paths;
    const components = response.data.components;

    for (const [endpointPath, methods] of Object.entries(paths)) {
      for (const [method, methodDetails] of Object.entries(methods)) {
        // Extract the necessary data for the current endpoint
        const refs = extractSchemaReferences(methodDetails, components.schemas);
        const filteredSchemas = filterSchemas(components?.schemas || {}, refs);

        const singleEndpointData = {
          openapi: response.data.openapi,
          info: response.data.info,
          servers: response.data.servers,
          paths: {
            [endpointPath]: {
              [method]: methodDetails,
            },
          },
          components: {
            schemas: filteredSchemas,
          },
        };

        const adjustedPath = endpointPath.split("/").slice(1).join('-');

        const endpointConfig = {
          output: {
            target: `${outputPath}${adjustedPath}-${method}.ts`,
            client: "react-query",
            mode: "split",
            override: {
              mutator: {
                path: customInstancePath,
                name:"customInstance",
              },
              query: {
                useQuery: true,
              },
            },
          },
          input: {
            target: singleEndpointData,
          },
        };

        configs.push(endpointConfig);
      }
    }

    fs.writeFileSync(
      orvalConfigPath,
      `module.exports = ${JSON.stringify(configs, null, 2)};`,
      "utf8"
    );
    await sleep(1000);
  } catch (error) {
    console.error("Error generating code:", error);
  }
};

const destination = `../../../${process.argv[2]}`;
const envPath = `.env`;
dotenv.config({ path: envPath });

const baseURL = process.env.NEXT_PUBLIC_GATEWAY;
const idsBaseURL = process.env.NEXT_PUBLIC_IDS;

/*
 * Const baseURL = 'https://qcommercegw-test.hasti.co'
 * const idsBaseURL = 'https://ids-test.hasti.co'
 */

codeGenerator(baseURL, idsBaseURL, destination);
