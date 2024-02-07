import Button from '@mui/material/Button';

export default function Timer({ timeLeft, resetGame }){
    return (
        <div className="timer">
            <div className='text'> Time left {timeLeft}</div>
            <Button variant='outlined' className="reset" onClick={resetGame}> Restart Game</Button>
        </div>
    )
}