import { useState } from "react"
export default function Player({initialName, symbol, active, onChangeName}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const editMode = () => {
        // setIsEditing(!isEditing);//never do this reason : state update is scheduled for the future 
        setIsEditing((editing) => !editing )
        if(isEditing){
            onChangeName(symbol, playerName)
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let editableName = <span className="player-name">{playerName}</span>
    if(isEditing) {
        editableName = <input value={playerName} required type="text" onChange={handleChange}/>
    }
    return(
        <li className= {active ? 'active' : undefined}>
            <span className="player">
                {editableName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={editMode}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}