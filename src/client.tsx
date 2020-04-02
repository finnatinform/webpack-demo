import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ReactNode} from "react";

declare let module: any;

export interface IClientProps{}
export interface IClientState{}

class Client extends React.Component<IClientProps, IClientState>{
    render():ReactNode{
        return(
            <div>
                Hello World!
            </div>
        );
    }
}

ReactDOM.render(
    <Client />,
    document.getElementById('id-application')
);

if (module.hot) {
    module.hot.accept();
}
