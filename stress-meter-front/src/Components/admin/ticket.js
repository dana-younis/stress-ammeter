export default function Ticket(props) {
  return (
    <article className="ticket">
      <h2> bbbb {props.studentName}</h2>
      <p>score: {props.counter}</p>
      <button onClick={() => props.handleClaim(props.id, props.socketId, props.counter, props.studentName)}>Claim</button>
    </article>
  )
}