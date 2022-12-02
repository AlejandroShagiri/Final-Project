import { useState } from 'react';
import styled from 'styled-components';
import Searchbar from '../Header/Searchbar';
import { FaSearch } from 'react-icons/fa';
import GameArchive from './GameArchive';
import PlayerArchive from './PlayerArchive';

const ArchivePage = () => {
	const [loaded, setLoaded] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [dropdownValue, setDropdownValue] = useState([]);
	const [ballData, setBallData] = useState([]);
	const [dropDownDetailOptions, setDropDownDetailOptions] = useState([]);
	const [dropDownDetail, setDropDownDetail] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [test, setTest] = useState('');
	const teams = [
		{ full_name: 'Atlanta Hawks', id: 1 },
		{ full_name: 'Boston Celtics', id: 2 },
		{ full_name: 'Brooklyn Nets', id: 3 },
		{ full_name: 'Charlotte Hornets', id: 4 },
		{ full_name: 'Chicago Bulls', id: 5 },
		{ full_name: 'Cleveland Cavaliers', id: 6 },
		{ full_name: 'Dallas Mavericks', id: 7 },
		{ full_name: 'Denver Nuggets', id: 8 },
		{ full_name: 'Detroit Pistons', id: 9 },
		{ full_name: 'Golden State Warriors', id: 10 },
		{ full_name: 'Houston Rockets', id: 11 },
		{ full_name: 'Indiana Pacers', id: 12 },
		{ full_name: 'LA Clippers', id: 13 },
		{ full_name: 'Los Angeles Lakers', id: 14 },
		{ full_name: 'Memphis Grizzlies', id: 15 },
		{ full_name: 'Miami Heat', id: 16 },
		{ full_name: 'Milwaukee Bucks', id: 17 },
		{ full_name: 'Minnesota Timberwolves', id: 18 },
		{ full_name: 'New Orleans Pelicans', id: 19 },
		{ full_name: 'New York Knicks', id: 20 },
		{ full_name: 'Oklahoma City Thunder', id: 21 },
		{ full_name: 'Orlando Magic', id: 22 },
		{ full_name: 'Philadelphia 76ers', id: 23 },
		{ full_name: 'Phoenix Suns', id: 24 },
		{ full_name: 'Portland Trail Blazers', id: 25 },
		{ full_name: 'Sacramento Kings', id: 26 },
		{ full_name: 'San Antonio Spurs', id: 27 },
		{ full_name: 'Toronto Raptors', id: 28 },
		{ full_name: 'Utah Jazz', id: 29 },
		{ full_name: 'Washington Wizards', id: 30 },
	];

	const nexthundred = async () => {
		await setPageNumber(pageNumber + 1);
		let filter = '';
		if (dropdownValue === 'games') {
			filter = `${dropDownDetail}[]=${searchText}`;
		} else if (dropdownValue === 'players') {
			filter = `${dropDownDetail}=${searchText}`;
		}
		fetch(
			`https://www.balldontlie.io/api/v1/${dropdownValue}?${filter}&per_page=100&page=${pageNumber}`
		)
			.then((response) => response.json())
			.then((data) => {
				setBallData(data);
				console.log(data);
			})
			.catch((err) => console.error(err));
	};

	const handleSelectChange = (e) => {
		setDropdownValue(e.target.value);
		if (e.target.value === 'games') {
			setDropDownDetailOptions([
				{ value: 'team_ids', friendlyName: 'Team name' },
				{ value: 'seasons', friendlyName: 'Season' },
			]);
		}
		if (e.target.value === 'players') {
			setDropDownDetailOptions([
				{ value: 'search', friendlyName: 'Search player name' },
			]);
		}
	};

	const handleDetailSelectChange = (e) => {
		setDropDownDetail(e.target.value);
	};

	const handleInputChange = (e) => {
		setSearchText(e.target.value);
	};

	const handleSubmit = async (e) => {
		await setPageNumber(1);
		let filter = '';
		e.preventDefault();
		e.stopPropagation();
		if (dropdownValue === 'games') {
			if (dropDownDetail === 'team_ids') {
				let teamId = teams.find((team) =>
					team.full_name.toLowerCase().includes(searchText.toLowerCase())
				).id;
				console.log(teamId);
				filter = `${dropDownDetail}[]=${teamId}`;
			} else {
				filter = `${dropDownDetail}[]=${searchText}`;
			}
		} else if (dropdownValue === 'players') {
			filter = `${dropDownDetail}=${searchText}`;
		}
		fetch(
			`https://www.balldontlie.io/api/v1/${dropdownValue}?${filter}&per_page=100&page=${pageNumber}`
		)
			.then((response) => response.json())
			.then((data) => {
				setBallData(data.data);
				setTest(dropdownValue);
			})
			.catch((err) => console.error(err));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<select
					onChange={(e) => {
						handleSelectChange(e);
					}}
				>
					<option>What are you looking for? </option>
					<option value={'games'}>Games</option>
					<option value={'players'}>Player</option>
				</select>
				{dropDownDetailOptions && dropDownDetailOptions.length >= 1 ? (
					<select onChange={handleDetailSelectChange}>
						<option></option>
						{dropDownDetailOptions.map((choice) => {
							return (
								<option value={choice.value}>{choice.friendlyName}</option>
							);
						})}
					</select>
				) : (
					// select with disabled option
					''
				)}
				{dropDownDetail && dropDownDetail.length >= 1 ? (
					<>
						<label for='searchright'></label>
						<input
							className='search expandright'
							id='searchright'
							type='search'
							placeholder='Search'
							onChange={handleInputChange}
						></input>
						<BtnStyle type='submit'>
							<FaSearch size={25} />
						</BtnStyle>
					</>
				) : (
					''
				)}
			</form>

			{test === 'games' ? (
				<>
					{ballData && ballData.length >= 1 ? (
						<GameArchive data={ballData} />
					) : (
						''
					)}
				</>
			) : (
				<>
					{test === 'players' ? (
						<>
							{ballData && ballData.length >= 1 ? (
								<PlayerArchive data={ballData} />
							) : (
								''
							)}
						</>
					) : (
						''
					)}
				</>
			)}

			<button onClick={nexthundred}>Load Next Page</button>
		</>
	);
};

const BtnStyle = styled.button`
	background-color: #f3f4f9;
	border: none;
	color: #082032;
	cursor: pointer;
	&:hover {
		color: gray;
	}
`;
export default ArchivePage;
