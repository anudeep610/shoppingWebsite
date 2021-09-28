import React from 'react'
import {Jumbotron} from "react-bootstrap";
// import NavBar from "./NavBar";

export default function Home() {
    return (
        <div>
        {/* <NavBar /> */}
        <Jumbotron className="text-center" style={{margin:"5rem"}}>
            <h1>Welcome to admin dashboard</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium deserunt blanditiis maiores possimus dolorum doloribus quod? Deleniti, laboriosam minima quaerat alias doloribus, soluta fugit culpa ad quisquam, quas eius et.</p>
        </Jumbotron>
        </div>
    )
}
