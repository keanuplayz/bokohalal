const fs = require('fs');
module.exports = function(eleventyConfig) {

    eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');

    eleventyConfig.addPassthroughCopy('src/img');

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('src/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        pathPrefix: '/',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            includes: '_includes',
            data: '_data',
            output: '_site',
        },
    };
};