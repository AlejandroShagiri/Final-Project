import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArchivePage from './Archive/ArchivePage';
import GlobalStyles from './GlobalStyles';
import Navbar from './Header/Navbar';
import Profile from './Profile';
import Homepage from './Homepage';
import { useAuth0 } from '@auth0/auth0-react';
import Rosters from './Rosters';
import Schedule from './Schedule';
import Score from './Score';
import TeamCreation from './TeamCreation';
import Teams from './Teams';

const App = () => {
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='/score' element={<Score />}></Route>
				<Route path='/schedule' element={<Schedule />}></Route>
				{isAuthenticated && (
					<>
						<Route path='/team' element={<Teams userId={'12346'} />}></Route>

						<Route
							path='/teamcreation'
							element={<TeamCreation userId={'12346'} />}
						></Route>
						<Route path='/archive' element={<ArchivePage />}></Route>
						<Route path='/profile' element={<Profile />}></Route>
						<Route path='/team/:teamName/:color' element={<Rosters />}></Route>
					</>
				)}
				<Route path='*' element={<Homepage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
