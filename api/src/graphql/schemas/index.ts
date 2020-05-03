const auth = require('./auth');
const game = require('./game');
const { mergeSchemas } = require('graphql-tools');

const MergeSchema = mergeSchemas({
    schemas: [
        auth,
        game
    ],
});

export default MergeSchema;
