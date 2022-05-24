import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'

interface Iprops{
    time: number;
    onEnd: Function
}

const CountDown: React.FC = (props: Iprops) => {
    const { time, onEnd } = props
    const [count, setCount] = useState(time || 60)
    useEffect(()=>{
        const interTime = setInterval(()=>{
            setCount((count: number)=>{
                if(count === 0) {
                    clearInterval(interTime)
                    onEnd && onEnd()
                    return count
                }else {
                    return count - 1
                }
            })
        }, 1000)
        return () =>{
            interTime && clearInterval(interTime)
        }
    }, [time, onEnd])
    return (
        <div>{count}</div>
    )
}

export default CountDown