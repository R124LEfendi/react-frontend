import axios from "axios"
import { useEffect, useState } from "react"

function ListComponent() {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:3333/user')
            // .then(res => res.json())
            .then(response => {
                setData(response.data)
            }
            )
    }, [])

    return (
        <div>{data}</div>
    )
}

export default ListComponent
