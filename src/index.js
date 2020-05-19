import React from "react";
import ReactDOM from "react-dom";
import Formik from "./components/Formik";

const App = () => {
    return (
        <div>
            <h1>React from Scratch in 5 mins</h1>
            <Formik />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
