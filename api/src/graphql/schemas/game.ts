import { makeExecutableSchema } from 'graphql-tools';

module.exports = makeExecutableSchema({
    typeDefs: `
    type Query {
        _dummy: String
        scores: [Score!]!
      }
      type Score {
        created_at: String,
        score: Int
    }
        type Mutation {
            createGame: Boolean
            play(turns: String): [Turn!]!
        }
        type Turn {
            index: String,
            type: Int
        }
    `
});
