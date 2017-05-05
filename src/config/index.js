import nconf from 'nconf';

nconf.argv().env({ lowerCase: true, separator: '__' });
nconf.file('local', `${__dirname}/local.json`);
nconf.file('environment', `${__dirname}/${nconf.get('NODE_ENV')}.json`);
nconf.file('defaults', `${__dirname}/base.json`);
nconf.load();

export default nconf;
