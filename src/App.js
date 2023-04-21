import { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";
import { clearMessages } from './store/slices/uiSlice';
import { getUserByToken } from "./store/controllers/authController";

import { Navigate, Route, Routes, useLocation } from "react-router"

import Footer from "./components/layout/Footer"
import Navbar from "./components/layout/Navbar"

import Home from "./components/pages/home/Home"
import Profile from "./components/pages/profile/Profile";
import Create from "./components/pages/create/Create";
import Guide from './components/pages/guide/Guide';
import Instructors from "./components/pages/instructors/Instructors";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";

const App = () => {
	console.log('xd');
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const activeUser = useSelector(state => state.user.activeUser);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname])

	useEffect(() => {
		if (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/profile' || pathname === '/create') {
			dispatch(clearMessages());
		}
	}, [dispatch, pathname])

	useEffect(() => {
		if (document.cookie.startsWith('auth_token'))
			dispatch(getUserByToken());
	}, [dispatch]);

	return (
		<div>
			{(pathname !== '/auth/login' && pathname !== '/auth/register') && <Navbar />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth/login" element={<Login />} />
				<Route path="/auth/register" element={<Register />} />
				<Route path="/profile" element={activeUser ? <Profile /> : <Navigate replace to='/' />} />
				<Route path="/create" element={activeUser?.userDetails?.isInstructor ?<Create /> : <Navigate replace to='/' />} />
				<Route path="/guides/:id" element={ activeUser ? <Guide /> : <Navigate replace to='/auth/register' />} />
				<Route path="/instructors" element={activeUser ? <Instructors /> : <Navigate replace to='/auth/register' />} />
				<Route path='/instructors/:id' element={activeUser ? <Profile /> : <Navigate replace to='/auth/register' />} />
			</Routes>
			{(pathname !== '/auth/login' && pathname !== '/auth/register') && <Footer />}
		</div>
	)
}
export default App
