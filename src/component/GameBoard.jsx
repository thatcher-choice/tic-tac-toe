import { useState } from "react";

export default function GameBoard({onSelectBox, board}) {
    return(
    <ol id="game-board">
        {board.map((row,rowIndex) =>(
            <li key={rowIndex}>
                <ol>
                    {row.map((value, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectBox(rowIndex, colIndex)} disabled={value}>{value}</button>
                        </li>
                    ))}
                </ol>
            </li> 
        ))}
    </ol>
    );
}