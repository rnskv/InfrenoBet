const dotenv = require('dotenv');

function showStatus({ mode, appName }) {
    const emoji = {
        production: '✈️',
        development: '🚢',
    };

    console.log(`Webpack building ${appName} for ${mode}. ${emoji[mode]}`);
}

function getDotEnvVariables({ mode }) {
    const isProduction = mode === 'production';
    try {
        const env = dotenv.config({
            path: isProduction ? './.env' : './.env.dev',
        }).parsed;

        return Object.keys(env).reduce((prev, next) => {
            prev[`${next}`] = JSON.stringify(env[next]);
            return prev;
        }, {});
    } catch (err) {
        throw new Error(`.env file for your mode not find.`)
    }
}

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

const mergeDeep = function (target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
};

module.exports.mergeDeep = mergeDeep;
module.exports.getDotEnvVariables = getDotEnvVariables;
module.exports.showStatus = showStatus;