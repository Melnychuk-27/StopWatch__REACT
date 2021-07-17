import React, {useRef} from "react";
import { render } from "react-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { interval,fromEvent } from "rxjs";

function App() {
  const [sec, setSec] = useState(0);
  const [status, setStatus] = useState("stop");
  const [waiting, setWaiting] = useState(false);

  const startStop = useRef(); 
  const wait = useRef(); 
  const reset = useRef(); 
  
  useEffect(() => {
    const stremInterval$ = interval(1000)
      .subscribe(() => {
        if (status === "run") {
          setSec(prevSecond => prevSecond + 1000);
        }
      });
    return () => {
      stremInterval$.unsubscribe();
    };

  }, [status]);

  useEffect(() => {
    const startStopStream$ = fromEvent(startStop.current, 'click').subscribe(() => {
      if(status === "run") {
        setSec(0);
        setStatus("stop");
        return;
      }
      setWaitingStatus();
    });
    const waitStream$ = fromEvent(wait.current, 'click').subscribe(() => {
      if(status === "stop") {return}
      if(waiting){ 
        setWaitingStatus();
        return;
      }
      const timer = setTimeout(()=> {
        setStatus("wait");
        setWaiting(true);
        clearInterval(timer);
      },300);
    });
    const resetStream$ = fromEvent(reset.current, 'click').subscribe(() => {
      setSec(0);
      setWaitingStatus();
    });

    return () => {
      startStopStream$.unsubscribe();
      waitStream$.unsubscribe();
      resetStream$.unsubscribe();
    }
  });

  function setWaitingStatus() {
    setWaiting(false);
    setStatus("run");
  }

  return (
    <div className="timer__wrapper">
      <div className="timer__item">
        <h1>Stopwatch</h1>
          <div className="timer__item-time">{new Date(sec).toISOString().slice(11, 19)}</div>
          <div>
            <button ref={startStop}>Start / Stop</button>
            <button ref={wait}>wait</button>
            <button ref={reset}>Reset</button>
          </div>
      </div>
    </div>
  );
}

render(<App />, document.getElementById("root"));

