import React, {useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App() {
    const [startStop, setStartStop] = useState(false);
    const [wait, setWait] = useState(false);
  
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    useEffect(()=>{
      let interval = null;
      if(startStop && !wait) {
        interval = setInterval(()=>{
          setSeconds(prevSeconds => prevSeconds +1)
        },1000)
      } else {
        if(wait) {return clearInterval(interval);} 
        clearInterval(interval);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
      }
      return () => {clearInterval(interval)}
    },[startStop,wait])
  
  
    useEffect(()=> {
      if(seconds === 60) {
        setSeconds(0);
        setMinutes(prevMinutes => prevMinutes +1)
      }
      if(minutes === 60) {
        setMinutes(0);
        setHours(prevHours => prevHours +1)
      }
    },[seconds]);
  
    function handleStartStopClick() {
      setStartStop(prevStartStop => !prevStartStop);
      setWait(false)
    }
  
    function handleWaitClick() {
      setWait(prevWait => !prevWait);
    }
  
    function handleResetClick() {
      setWait(false)
      setStartStop(prevStartStop => !prevStartStop);
      setTimeout(()=>{setStartStop(prevStartStop => !prevStartStop);},10)
    }
  
    return (
      <>
      <div className="timer__wrapper">
        <div className="timer__item">
          <h1>Stopwatch</h1>
          <div className="timer__item-time">{hours<10?`0${hours}`:hours}:{minutes<10?`0${minutes}`:minutes}:{seconds<10?`0${seconds}`:seconds}</div>
          <div>
            <button onClick={handleStartStopClick}>Start / Stop</button>
            <button onClick={handleWaitClick}>Wait</button>
            <button onClick={handleResetClick}>Reset</button>
          </div>
        </div>
      </div>
      </>
    );
  }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

