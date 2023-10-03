import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfessionByName } from "../../../../store/controllers/userController";
import { userActions } from "../../../../store/slices/userSlice";
import InputGroup from "../common/InputGroup";

let timeout;
const Profession = ({ defaultValue, setProfId }) => {
	const dispatch = useDispatch();
	const inpRef = useRef();

	const professions = useSelector((state) => state.user.professions);

	function onSearch(event) {
		clearTimeout(timeout);
		setProfId(null);

		if (event.target.value === "") {
			dispatch(userActions.updateProfessions([]));
			clearTimeout(timeout);
			return;
		}

		timeout = setTimeout(() => {
			dispatch(getProfessionByName(event.target.value.trim()));
			if (event.target.value === professions[0].name && professions.length === 1)
				setProfId(professions[0].professionId)
			timeout = null;
		}, 500);
	}

	return (
		<div className="relative mb-10">
			<InputGroup
				color="secondary"
				type="dropdown"
				text="Profession"
				noMargin={true}
				onChange={onSearch}
				fieldRef={inpRef}
				defaultValue={defaultValue}
			/>
			{(professions.length && inpRef.current.value !== professions[0].name) ? (
				<ul
				className="w-full border-2
				border-secondary-main text-dark-main
				text-lg text-center h-fit max-h-52 overflow-auto
				absolute bg-light-main z-10"
				>
					{professions.map((profession) => (
						<li
							className="p-2 border-b-2 border-secondary-main last:border-b-0
							hover:cursor-pointer hover:bg-secondary-main hover:text-light-main"
							key={profession.professionId}
							onClick={() => {
								inpRef.current.value = profession.name;
								setProfId(profession.professionId);
								dispatch(userActions.updateProfessions([]));
							}}
						>
							{profession.name}
						</li>
					))}
				</ul>
			) : (
				""
			)}
		</div>
	);
};
export default Profession;
