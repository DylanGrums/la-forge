const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                'la-forge-bg-primary': '#1E1E1E',
                'la-forge-bg-secondary': '#141315',
                'la-forge-bg-tertiary': '#5607db',
                'la-forge-primary': '#8a51ec',
            }
        },
    },
    plugins: [],
};