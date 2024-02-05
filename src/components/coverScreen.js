export default function CoverScreen({ startGame, score }){
    return (
        <div className="">
            {
                score != -1 && <h5> your score is {score}</h5>

            }
            <button onClick={startGame}> Start Game</button>
        </div>
    )
}