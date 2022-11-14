const dev = require("./webpack.config.dev")
const prod = require("./webpack.config.prod")
const node_env = process.env.NODE_ENV;
if (node_env == 'development') {
    module.exports = dev
};
if (node_env == 'production') {
    module.exports = prod
}

