const Loading = () => {
  return (
	<div className="flex justify-center items-center p-5">
		<span className="inline-block animate-spin h-8 w-8 mr-3
		border-4 rounded-full border-light-main border-b-secondary-main"></span>
		<h3 className="text-secondary-main text-2xl">Loading...</h3>
	</div>
  )
}
export default Loading