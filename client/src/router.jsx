import { createBrowserRouter, redirect, useRouteError } from "react-router-dom";
import { RootLayout } from "./Layouts/RootLayout";
import { TodosRoute } from "./pages/Todos";
import { NewTodo } from "./pages/NewTodo";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <RootLayout />,
        children: [
            {
                errorElement: <ErrorPage />,
                children:[
                    {
                        index: true, 
                        ...TodosRoute 
                    },
                    { 
                        path: "new",
                        element: <NewTodo />,
                        action: async ({ request }) => {
                            const formData = await request.formData()
                            const title = formData.get("title")

                            if (title === ""){
                                return "Title is required"
                            }

                            const todo = await fetch("http://localhost:3000/todos", {
                                method: "POST",
                                signal: request.signal,
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({title, completed: false})
                            }).then(res => res.json())

                            return redirect("/")
                        }
                    },
                    {
                        path: "*",
                        element: <h1>404</h1>
                    }
                ]
            }
        ]
    }
])

function ErrorPage(){
    const error =  useRouteError()

    return (
        <>
        <h1>Something went wrong!</h1>
        {import.meta.env.Mode !== "production" && (
            <>
            <pre>{error.message}</pre>
            <pre>{error.stack}</pre>
            </>
        )}
        </>
    )
}