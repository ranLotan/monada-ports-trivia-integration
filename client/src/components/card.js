import Button from '@mui/material/Button';

export default function Card({card, index, clickHandler}){    
    return (
        <div className={`card ${card.hide}`}> 
            <Button variant="contained"
                style={{ backgroundColor: card.backgroundColor, minWidth: "150px" }}
                onClick={() => clickHandler(index)}>
                {card.name}
            </Button>
        </div>
    )
}       


