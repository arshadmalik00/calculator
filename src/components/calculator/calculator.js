import React, { useState } from "react";
import styles from "./calculator.module.css";
import { evaluate } from "mathjs";

const keys = ["C", "X", "%", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="];

export default function Calculator() {
  const [value, setValue] = useState("");
  console.log("this.value", value);

  //  logic for keys and seting state
  const handleOnClick = (key) => {
    if(key==="C"){
        setValue("")
      }else if(key === "X"){
        if (value.length > 0) {
            setValue((prevValue) => prevValue.slice(0, -1));
          }
      }else if(key === "="){
        handleResult();
      }else if (value.length < 16) {
        setValue((prevValue) => prevValue + key);
      }
  };

//handeling result
  const handleResult =()=>{
    try{
       const result = evaluate(value);
       setValue(`${result}`);
    } catch(e){
        console.log(e);
    }
  }
  

  return (
    <div className={styles.fullDisplay}>
      <div className={styles.mainCont}>
        <div className={styles.innerCont}>
          <div className={styles.screen}>
            <input
              type="text"
              autoFocus
              maxLength="16"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className={styles.buttons}>
            {keys.map((key, i) => (
              <button key={i} onClick={() => handleOnClick(key)} className={key === "0" ? `${styles.button} ${styles.zeroButton}` : styles.button}>
                <span>{key}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
