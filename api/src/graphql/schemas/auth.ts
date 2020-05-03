import { makeExecutableSchema } from 'graphql-tools';

module.exports = makeExecutableSchema({
    typeDefs: `
        type Query {
            me: Me
        }
        type Mutation {
        
            register(
                username: String!
            ): Me!
        }
        type Me {
            username: String!
            access_token: String!,
        }
    `
});
