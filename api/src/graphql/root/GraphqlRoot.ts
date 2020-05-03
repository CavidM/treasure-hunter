import AuthController from "../../controllers/AuthController";
import GameController from "../../controllers/GameController";

const GraphqlRoot = () => {

    const auth = new AuthController();
    const game = new GameController();
    // const module = new ModuleController();

    return {
        me: auth.me,
        register: auth.register,
        createGame: game.createGame,
        play: game.play,
        scores: game.scores
    }
};

export default GraphqlRoot;
