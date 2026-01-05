export const Result = (props) => {
  const {id, title, rating, posterUrl} = props.movie

  return (
    <div id={id}>{title} ({rating})</div>
  )
}