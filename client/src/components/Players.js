import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { GiTankTop } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';

const Players = () => {
	const [players, setPlayers] = useState([]);
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a19bf6f9ddmsheecbe7891105021p1ee2cdjsn5d9242e66a96',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
		},
	};

	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setPlayers(data.data);
				console.log(data);
			});
	}, []);

	return (
		<>
			<h1>Please chose a team</h1>
			<List>
				<TeamNameDiv>
					<TeamName>Atlanta: </TeamName>
				</TeamNameDiv>
				<ListItem>
					<PlayerDiv>
						<h3>Dejounte Murray | G </h3>
						<ButtonIcon>
							<GiTankTop size={100} />
						</ButtonIcon>
						<JerseyNumber>#5</JerseyNumber>
					</PlayerDiv>
				</ListItem>
				<ListItem>
					<PlayerDiv>
						<h3>Frank Kaminsky | F-C</h3>
						<ButtonIcon>
							<GiTankTop size={100} />
						</ButtonIcon>
						<h2>#8</h2>
					</PlayerDiv>
				</ListItem>
			</List>
		</>

		// <MainDiv>
		// 	<h1>All players</h1>
		// 	<>
		// 		{players.length !== 0 &&
		// 			players.response.map((player) => {
		// 				return (
		// 					<Container>
		// 						<h3>
		// 							{player.leagues.standard.pos}
		// 							{player.firstname}
		// 							{player.lastname}
		// 						</h3>
		// 						<h2>{player.leagues.standard.jersey}</h2>
		// 					</Container>
		// 				);
		// 			})}
		// 	</>
		// </MainDiv>
	);
};

const MainDiv = styled.div``;

const Wrapper = styled.div`
	border: 2px solid pink;
`;

const Container = styled.div`
	border: 2px solid red;

	justify-content: space-evenly;
	align-items: center;
`;

const ButtonIcon = styled.a`
	color: white;
`;
const PlayerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #c8102e;
	padding: 10px;
`;

const List = styled.ul`
	display: flex;
	gap: 10px;
	color: white;
`;

const ListItem = styled.li``;

const TeamName = styled.h1`
	color: #c8102e;
`;

const TeamNameDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const JerseyNumber = styled.h2`
	color: black;
	position: absolute;
	margin-top: 40px;
`;
const Logo = styled.img`
	height: 200px;
`;

const Nav = styled(NavLink)`
	color: white;
`;
export default Players;
