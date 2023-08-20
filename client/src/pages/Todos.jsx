import { Form, useLoaderData } from "react-router-dom"
import { TodoItem } from "../components/TodoItem"
import { useEffect, useRef } from "react"

function Todos(){
    const {todos, searchParams: {query} } = useLoaderData()
    const queryRef = useRef()

    useEffect(() => {
        queryRef.current.value = query
    }, [query])
    
    return (
        <>
            <h1 className="page-title">Todos</h1>
            <Form className="form" method="get" >
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="query">Search</label>
                        <input type="search" name="query" id="query" ref={queryRef}/>
                    </div>
                    <button className="btn">Search</button>
                </div>
            </Form>
            <ul>
            {todos.map(todo => {
                return (<TodoItem key={todo.id} {...todo} />)
            })}
            </ul>
        </>
    )
}

async function loader({ request: {signal, url} }){
    const searchParams = new URL(url).searchParams
    const query = searchParams.get("query") || ""
    return {
        searchParams: { query },
        todos: await fetch(`http://localhost:3000/todos?q=${query}`, { signal }).then(res => res.json())
    }
}

export const TodosRoute = {
    loader,
    element: <Todos />
}