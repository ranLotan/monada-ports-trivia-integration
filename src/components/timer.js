export default function Timer({ timeLeft, resetGame }){
    return (
        <div className="timer">
            <div>
                <h4> Time left {timeLeft}</h4>
            </div>
            <div>
                <button className="reset" onClick={resetGame}> Restart Game</button>
            </div>
        </div>
    )
}