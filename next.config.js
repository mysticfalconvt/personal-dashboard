const removeImports = require("next-remove-imports")({
  options: {},
});

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
module.exports = removeImports();
