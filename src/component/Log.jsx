export default function Log({turns}) {

    return <ol id="log">
        {turns.map((turn) => (
        <li key={`${turn.position.row}${turn.position.col}`}>
            {turn.player} selected {turn.position.row}, {turn.position.col}
        </li>
        ))}
    </ol>
}