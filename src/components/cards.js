"use client";
import { useState, useRef } from "react";
import Card from './card';

const data = new Map([
  ["USA", "Washington, D.C."],
  ["Canada", "Ottawa"],
  ["United Kingdom", "London"],
  ["France", "Paris"],
  ["Germany", "Berlin"],
  ["Italy", "Rome"],
  ["Spain", "Madrid"],
  ["Japan", "Tokyo"],
  ["China", "Beijing"],
  ["India", "New Delhi"],
  ["Australia", "Canberra"],
  ["Brazil", "Brasília"],
  ["South Africa", "Pretoria"],
  ["Russia", "Moscow"],
  ["Mexico", "Mexico City"],
  ["Israel", "jerusalem"]
]);

const cardColor = 'grey';
const cardClickedColor = 'blue';
const cardMatchErrorColor = 'red';
const keysAndValuesArray = [...data.entries()];
const objects = keysAndValuesArray.map((entrie, i) => {
    return [
        { matchId: i , name: entrie[0], backgroundColor: cardColor, hide: '' },
        { matchId: i , name: entrie[1], backgroundColor: cardColor, hide: '' }
    ];
}).flat().sort(() => Math.random() - 0.5);

export default function Cards() {
    const [cards, setCards] = useState(objects);
    const [previousSelected, setPreviousSelected] = useState(-1);
    const previousIndex = useRef(-1);

    function match(index){
        if (cards[index].matchId === previousSelected.matchId){
            cards[index].hide = 'hide';
            cards[previousIndex.current].hide = 'hide';
        }
        else {
            cards[index].backgroundColor = cardMatchErrorColor;
            cards[previousIndex.current].backgroundColor = cardMatchErrorColor;
        }
        previousIndex.current = -1;
        setCards([...cards]);
    }

    const clickHandler = (index) => {
        if (previousIndex.current === -1){
            cards.forEach((card) => card.backgroundColor = cardColor);
            cards[index].backgroundColor = cardClickedColor;
            setPreviousSelected(cards[index]);
            setCards([...cards]);
            previousIndex.current = index;

        }
        else{
            if (index !== previousIndex.current){
                match(index);
            }
            else{
                alert('you chossed the same card');
            }
        }
        console.log(index);
        console.log(cards[index]);
    }

    clickHandler.bind(cards);
        return (
            <div className='container'>
                {cards.map((card, index) => {
                    return (
                        <Card key={index} card={card} index={index} clickHandler={clickHandler}/>
                    )
                })}
            </div>
        )
    }
      

