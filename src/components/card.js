export default function Card({card, index, clickHandler}){
    // const visible = card.hide === true ? 'hidden' : 'visible';
    
    return (
        <div className={`card ${card.hide}`}> 
            <button
                style={{ backgroundColor: card.backgroundColor, minWidth: "150px" }}
                onClick={() => clickHandler(index)}
            >
                {card.name}
            </button>
        </div>
    )
}       


