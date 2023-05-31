import * as React from "react";
import { createRoot } from 'react-dom/client'
import {App} from "./Dialog"

const DocUI = () => {
    return (
        <div>
            <h2>Design Doc Generator</h2>
            <App></App>
        </div>
    );
}

const root = createRoot(document.getElementById('docUI')!) // createRoot(container!) if you use TypeScript
root.render(<DocUI />)