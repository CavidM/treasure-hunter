import React from 'react';

function CellComponent(props:any) {

console.log(props);

    return (
    <td>{props.element.type}</td>
    );
}

export default CellComponent;