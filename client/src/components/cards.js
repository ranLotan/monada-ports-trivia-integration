"use client";
import { useState, useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import Card from './card';
import CoverScreen from './coverScreen';
import Timer from "./timer";

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
const baseUrl = 'http://localhost:4000/game-data'
const CARD_COLOR = 'grey';
const CARD_CLICKED_COLOR = 'blue';
const MATCH_ERROR_COLOR = 'red';
const INITIAL_TIMER = 180;
const keysAndValuesArray = [...data.entries()];
const objects = keysAndValuesArray.map((entrie, i) => {
    return [
        { matchId: i , name: entrie[0], backgroundColor: CARD_COLOR, hide: '' },
        { matchId: i , name: entrie[1], backgroundColor: CARD_COLOR, hide: '' }
    ];
}).flat().sort(() => Math.random() - 0.5);

// const testGet = axios.get(baseUrl).then((response) => {
//     console.log(response.data);
// })

export default function Cards() {
    const [cards, setCards] = useState(objects);
    const [previousSelected, setPreviousSelected] = useState(-1);
    const [startGame, setStartGame] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIMER);
    const timeStarted = useRef(Date.now());
    const previousIndex = useRef(-1);
    const timerRef = useRef(5);
    const score = useRef(-1);

    useEffect(() => {
        if (startGame) {
          timerRef.current = setInterval(() => {
            setTimeRemaining((prevTimeRemaining) => {
              if (prevTimeRemaining > 0) {
                return prevTimeRemaining - 1;
              } else {
                clearInterval(timerRef.current);
                setStartGame(false);
                return 0;
              }
            });
          }, 1000);
        }
    
        return () => {
          clearInterval(timerRef.current);
        };
      }, [startGame]);
    function calculateScore(){
        return Math.round(((new Date()).getTime() - timeStarted.current.getTime()) / 10);
    }
    

    function isGameCompleted(){
        setTimeout(() => { 
            if (cards.every(card => card.hide === 'hide')){
                stopGameFunc();
                score.current = calculateScore();
            }
        }, 0);
    }
    function match(index){
        if (cards[index].matchId === previousSelected.matchId){
            cards[index].hide = 'hide';
            cards[previousIndex.current].backgroundColor = CARD_COLOR;
            cards[previousIndex.current].hide = 'hide';
            isGameCompleted();
        }
        else {
            cards[index].backgroundColor = MATCH_ERROR_COLOR;
            cards[previousIndex.current].backgroundColor = MATCH_ERROR_COLOR;
        }
        previousIndex.current = -1;
        setCards([...cards]);
    }

    const clickHandler = (index) => {
        if (previousIndex.current === -1){
            cards.forEach((card) => card.backgroundColor = CARD_COLOR);
            cards[index].backgroundColor = CARD_CLICKED_COLOR;
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

    function startGameFunc(){
        setStartGame(true);
        cards.forEach(card => {
            card.hide = '';
            card.backgroundColor = CARD_COLOR;
        });
        setCards(cards);
        setTimeRemaining(INITIAL_TIMER);
        timeStarted.current = new Date();
    }

    function stopGameFunc(){
        setStartGame(false);

    }

    // clickHandler.bind(cards);
        return (
            <div>
                <div className="">
                    { 
                        startGame === true && <Timer timeLeft={timeRemaining} resetGame={startGameFunc}/>
                    }
                </div>
                <div className="score-board"> 
                    {   
                        startGame === false && <CoverScreen startGame={startGameFunc} score={score.current}/>
                    }
                </div>   
                <div className='container'>
                    { 
                        startGame === true && cards.map((card, index) => {
                            return (
                                <Card key={index} card={card} index={index} clickHandler={clickHandler}/>
                                )
                            })
                        }
                </div>
            </div>
        )
    }
      

