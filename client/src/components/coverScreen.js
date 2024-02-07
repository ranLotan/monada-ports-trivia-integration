import { Leaderboard } from "../data/scores-data"
import Button from '@mui/material/Button';
import ScoreBoard from "./score-board"

export default function CoverScreen({ startGame, score }){
    return (
        <div className="">
            {
                score != -1 && <h5> your score is {score}</h5>
            }
            <Button variant='contained' onClick={startGame}> Start Game</Button>
            
            <ScoreBoard data={Leaderboard.sort((a,b) => a.score > b.score ? 1 : -1 )}></ScoreBoard>
        </div>


    )
}