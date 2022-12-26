import React, { useEffect } from 'react';

function Child() {
    const changes = () => {
        const a = Math.random() * 100
        if (a < 50) {
            afterAll()
        }
    }
    return (
        <div className="App">
            <button onClick={changes}>222</button>
            {/* <img src='https://images.pexels.com/photos/1476976/pexels-photo-14769376.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'></img> */}
        </div>
    );
}

export default Child;
