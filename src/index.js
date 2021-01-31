"use strict";
module.exports = function(context, options = {}) {
    const {Syntax, RuleError, fixer, report, getSource} = context;
    return {
        [Syntax.Str](node) {
            /** @type {string} */
            const text = getSource(node);
            for (let i = 0; i < text.length; i++) {
                switch (text[i]) {
                case '、':
                    report(
                        node,
                        new RuleError(
                            '\'、\'が使用されています。 \'，\'を使用してください。',
                            {
                                index: i,
                                fix: fixer.replaceTextRange([i, i + 1], '，'),
                            },
                        ),
                    );
                    break;
                case '。':
                    report(
                        node,
                        new RuleError(
                            '\'。\'が使用されています。 \'．\'を使用してください。',
                            {
                                index: i,
                                fix: fixer.replaceTextRange([i, i + 1], '．'),
                            },
                        ),
                    );
                    break;
                }
            }
        },
    }
};
