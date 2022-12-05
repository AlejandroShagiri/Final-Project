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
			})
			.catch((err) => console.error(err));
	}, []);

	const handleClick = (myPlayer) => {
		fetch('/api/player', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: myPlayer.id,
				userId: '12346',
				fname: myPlayer.firstname,
				lname: myPlayer.lastname,
				jersey: myPlayer.leagues.standard.jersey,
				position: myPlayer.leagues.standard.pos,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				window.alert('Added to Team creation');
			})

			.catch((error) => {
				window.alert(error);
			});
	};

	return (
		<>
			<h1>Hello</h1>
			<MainDiv>
				<>
					{players.length !== 0 &&
						players.response.map((player) => {
							return (
								<>
									{/* <Container> */}
									<StyledBtn
										onClick={(event) => {
											handleClick(player);
											event.preventDefault();
											event.stopPropagation();
										}}
									>
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
									</StyledBtn>
									{/* </Container> */}
								</>
							);
						})}
				</>
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div`
	display: flex;
	width: 100vw;
	flex-wrap: wrap;
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
	width: 180px;
	margin: 10px;
`;

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

const StyledBtn = styled.button`
	height: 140px;
	border: none;
	&:hover {
		opacity: 80%;
		cursor: pointer;
	}
`;

export default Rosters;
