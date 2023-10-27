import { useSelector } from "react-redux"

const Error = () => {
  const error = useSelector(state => state.ui.error);
  return (
    <>
      {error ? <h1 className="text-danger-dark text-3xl py-10">{error}</h1> : ''}
    </>
  )
}
export default Error