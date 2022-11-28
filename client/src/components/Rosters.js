import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useParams } from 'react-router-dom';
import { GiTankTop } from 'react-icons/gi';

const Rosters = () => {
	const { teamName, color } = useParams();
	const [players, setPlayers] = useState([]);
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a19bf6f9ddmsheecbe7891105021p1ee2cdjsn5d9242e66a96',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
		},
	};
	useEffect(() => {
		fetch(
			`https://api-nba-v1.p.rapidapi.com/players?team=${teamName}&season=2022`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				setPlayers(response);
				console.log(response);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<>
			<MainDiv>
				<h1>All players</h1>
				<>
					{players.length !== 0 &&
						players.response.map((player) => {
							console.log(player);
							return (
								<>
									<h1></h1>
									<Container>
										<List>
											<ListItem>
												<PlayerDiv color={color}>
													<h3>
														{player.firstname} {player.lastname} |{' '}
														{player.leagues.standard.pos}
													</h3>
													<ButtonIcon>
														<GiTankTop size={100} />
													</ButtonIcon>
													<JerseyNumber>
														{player.leagues.standard.jersey}
													</JerseyNumber>
												</PlayerDiv>
											</ListItem>
										</List>
									</Container>
								</>
							);
						})}
				</>
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div``;
const Container = styled.div`
	border: 2px solid red;
	display: grid;

	/* justify-content: space-evenly;
	align-items: center; */
`;

const ButtonIcon = styled.a`
	color: white;
`;
const PlayerDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #${(props) => props.color};
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

export default Rosters;
