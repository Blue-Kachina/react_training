import {useState} from "react";
import {Button} from "react-bootstrap";

let count = 0

export default  function MyButton() {
    let [count,setCount] = useState(0)

    if(count > 10) {
        throw new Error('Number too large.')
    }

    return <Button onClick={() => (setCount(count + 1))}>The count is: {count}</Button>
}
