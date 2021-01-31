'use strict';
const TextLintTester = require('textlint-tester');
const tester = new TextLintTester();
const rule = require('../src/index');
tester.run(
    'kutoten',
    {
        plugins: [
            {
                pluginId: 'latex2e',
                plugin: require('textlint-plugin-latex2e').default,
                options: {
                    extensions: ['.tex'],
                },
            }
        ],
        rules: [
            {
                ruleId: 'kutoten',
                rule,
            }
        ],
    },
    {
        valid: [
            {
                text: 'あいうえお，かきくけこ．',
                ext: '.tex',
            },
        ],
        invalid: [
            {
                text: `あいうえお、かきくけこ。`,
                ext: '.tex',
                errors: [
                    {
                        message: '\'、\'が使用されています。 \'，\'を使用してください。',
                        index: 5,
                    },
                    {
                        message: '\'。\'が使用されています。 \'．\'を使用してください。',
                        index: 11,
                    },
                ],
            },
        ],
    },
);
