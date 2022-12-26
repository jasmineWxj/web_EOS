import './App.css';
import React, { useEffect } from 'react';
import Child from './component/Child';

function App() {
  useEffect(() => {
    // 发生异常
    // error()
  });	
  const change = () =>{
    const a = Math.random() * 100
    // setTimeout(() => {
    //     // console.log('1->begin')
    //     throw "cccccc";
    // })
    if(a < 50){
      // Promise.reject("promise error");
      // new Promise((resolve, reject) => {
      //   reject("promise error");
      // });
      // new Promise((resolve) => {
      //   resolve();
      // }).then(() => {
      //   throw "promise error";
      // });
      // throw '11223'


      // new Promise((resolve, reject) => {
      //   if(1){
          afterAll()
      //   }
      // });
    }
  }

  return (
    <div className="App">
      <Child></Child>
      <button onClick={change}>1111</button>
      <div className='aaa'></div>
      <img src='https://images.pexels.com/photos/1476976/pexels-photo-14769376.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'></img>
    </div>
  );
}

export default App;
