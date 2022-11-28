import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Archive from './Archive';
import GlobalStyles from './GlobalStyles';
import Navbar from './Header/Navbar';
import Homepage from './Homepage';
import Players from './Players';
import Rosters from './Rosters';
import Schedule from './Schedule';
import Score from './Score';
import TeamCreation from './TeamCreation';
import Teams from './Teams';

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<Navbar />
			<Routes>
				<Route path='/' element={<Homepage />}></Route>
				<Route path='/score' element={<Score />}></Route>
				<Route path='/schedule' element={<Schedule />}></Route>
				<Route path='/team' element={<Teams />}></Route>
				<Route path='/players' element={<Players />}></Route>
				<Route path='/teamcreation' element={<TeamCreation />}></Route>
				<Route path='/archive' element={<Archive />}></Route>
				<Route path='/team/:teamName/:color' element={<Rosters />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
