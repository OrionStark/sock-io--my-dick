module.exports.getConfiguration = () => {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        const yaml = require('yaml');
        fs.readFile('./conf.yaml', 'utf8', (err, conf) => {
            if ( err ) { return reject(err); }
            const parse = yaml.parse(conf);
            resolve(parse);
        });
    });
};