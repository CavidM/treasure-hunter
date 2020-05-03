// const NodeCache = require( "node-cache" );

// const cache = new NodeCache();

/**
 * {
                current: {
                    turns:[],
                    game: null,
                    created_at: ''
                },
                scores: []
            }
 */
let map = new Map();

export default function Store() {

    return map
}