import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { clearMessages, uiActions } from './store/slices/uiSlice';
import { getUserByToken } from "./store/controllers/authController";

import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router"

import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"

import Landing from "./components/pages/landing/Landing"
import Login from "./components/pages/Login"
import Register from "./components/pages/Register"
import Profile from "./components/pages/profile/Profile";
import Create from "./components/pages/create/Create";
import Guide from './components/pages/guide/Guide';

const App = () => {
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const showLayout = useSelector(state => state.ui.showLayout);
	const { activeUser } = useSelector(({ user }) => user);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname])

	useEffect(() => {
		if (pathname === '/login' || pathname === '/register')
			dispatch(uiActions.setShowLayout(false));
		else
			dispatch(uiActions.setShowLayout(true));

		if (pathname === '/login' || pathname === '/register' || pathname === '/profile' || pathname === '/create') {
			dispatch(clearMessages());
		}

	}, [dispatch, pathname])

	useEffect(() => {
		if (document.cookie.startsWith('auth_token'))
			dispatch(getUserByToken());
	}, [dispatch, navigate]);

	return (
		<div className="">
			{showLayout && <Navbar />}
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/:id" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={activeUser ? <Profile /> : <Navigate replace to='/' />} />
				<Route path="/create" element={<Create />} />
				<Route path="/guide/:id" element={ <Guide />} />
			</Routes>
			{showLayout && <Footer />}
		</div>
	)
}
export default App
