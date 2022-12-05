import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { GiTankTop } from 'react-icons/gi';
import { TiDelete } from 'react-icons/ti';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const TeamCreation = ({ userId }) => {
	const [myPlayers, setMyPlayers] = useState([]);
	const [myTeam, setMyTeam] = useState({
		PG: {},
		SG: {},
		SF: {},
		PF: {},
		C: {},
		sixth: {},
	});
	const [guards, setGuards] = useState([]);
	const [forwards, setForwards] = useState([]);
	const [center, setCenter] = useState([]);
	const [myPlayer, setMyPlayer] = useState([]);
	useEffect(() => {
		fetch(`/api/players/${userId}`)
			.then((res) => res.json())
			.then((info) => {
				if (info.data !== undefined) {
					setMyPlayers(info.data);
					info.data.map((player) => {
						if (player.position.includes('G')) {
							guards.push(player);
						}
						if (player.position.includes('F')) {
							forwards.push(player);
						}
						if (player.position.includes('C')) {
							center.push(player);
						}
					});
				} else {
					document.getElementById('empty').innerHTML =
						'No Players on your team';
				}
			});
	}, []);

	const handleClick = (e) => {
		fetch(`/api/player/${userId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: e.id }),
		})
			.then((res) => res.json())
			.then((data) => {
				//searches on the index of the userId players and deletes from there

				if (!!data && data.deletedCount === 1) {
					const index = myPlayer.findIndex((e) => e.userId === userId);
					myPlayer.splice(index, 1);
					window.location.reload();
				}
			});
	};

	const handleChange = (id, position) => {
		if (position === 'PG') {
			myTeam.PG = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
		if (position === 'SG') {
			myTeam.SG = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
		if (position === 'SF') {
			myTeam.SF = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
		if (position === 'PF') {
			myTeam.PF = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
		if (position === 'C') {
			myTeam.C = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
		if (position === 'sixth') {
			myTeam.sixth = myPlayers.find((player) => player.id === parseInt(id));
			const index = myPlayers.findIndex((player) => player.id === parseInt(id));
			const newPlayers = myPlayers.splice(index, 1);
			setMyPlayer(newPlayers);
		}
	};

	return (
		<>
			<Title>Your team!</Title>
			<Container>
				<PointGuard>
					<h1>PG</h1>
					<select onChange={(e) => handleChange(e.target.value, 'PG')}>
						<option>Choose a player</option>
						{guards &&
							guards.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}
									</option>
								);
							})}
					</select>
					{myTeam.PG.id ? (
						<JerseyContainer>
							<JerseyName>{myTeam.PG.lname}</JerseyName>
							<JerseyNumber>{myTeam.PG.jersey}</JerseyNumber>
							<Icon>
								<GiTankTop size={200} />
							</Icon>
						</JerseyContainer>
					) : (
						''
					)}
				</PointGuard>
				<ShootingGuard>
					<h1>SG</h1>
					<select onChange={(e) => handleChange(e.target.value, 'SG')}>
						<option>Choose a player</option>
						{guards &&
							guards.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}{' '}
									</option>
								);
							})}
					</select>
					{myTeam.SG.id ? (
						<JerseyContainer>
							<JerseyName>{myTeam.SG.lname}</JerseyName>
							<JerseyNumber>{myTeam.SG.jersey}</JerseyNumber>
							<Icon>
								<GiTankTop size={200} />
							</Icon>
						</JerseyContainer>
					) : (
						''
					)}
				</ShootingGuard>
				<SmallForward>
					<h1>SF</h1>
					<select onChange={(e) => handleChange(e.target.value, 'SF')}>
						<option>Choose a player</option>
						{forwards &&
							forwards.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}{' '}
									</option>
								);
							})}
					</select>
					{myTeam.SF.id ? (
						<JerseyContainer>
							<JerseyName>{myTeam.SF.lname}</JerseyName>
							<JerseyNumber>{myTeam.SF.jersey}</JerseyNumber>
							<Icon>
								<GiTankTop size={200} />
							</Icon>
						</JerseyContainer>
					) : (
						''
					)}
				</SmallForward>
				<PowerForward>
					<h1>PF</h1>
					<select onChange={(e) => handleChange(e.target.value, 'PF')}>
						<option>Choose a player</option>
						{forwards &&
							forwards.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}{' '}
									</option>
								);
							})}
					</select>
					{myTeam.PF.id ? (
						<JerseyContainer>
							<JerseyName>{myTeam.PF.lname}</JerseyName>
							<JerseyNumber>{myTeam.PF.jersey}</JerseyNumber>
							<Icon>
								<GiTankTop size={200} />
							</Icon>
						</JerseyContainer>
					) : (
						''
					)}
				</PowerForward>
				<Center>
					<h1>C</h1>
					<select onChange={(e) => handleChange(e.target.value, 'C')}>
						<option>Choose a player</option>
						{center &&
							center.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}{' '}
									</option>
								);
							})}
					</select>
					{myTeam.C.id ? (
						<JerseyContainer>
							<JerseyName>{myTeam.C.lname}</JerseyName>
							<JerseyNumber>{myTeam.C.jersey}</JerseyNumber>
							<Icon>
								<GiTankTop size={200} />
							</Icon>
						</JerseyContainer>
					) : (
						''
					)}
				</Center>
				<Bench>
					<h1>6th</h1>
					<select onChange={(e) => handleChange(e.target.value, 'sixth')}>
						<option>Choose a player</option>
						{myPlayers &&
							myPlayers.map((player) => {
								return (
									<option value={player.id}>
										{player.fname} {player.lname}{' '}
									</option>
								);
							})}
					</select>
					{myTeam.sixth.id ? (
						<div>
							<JerseyContainer>
								<JerseyName>{myTeam.sixth.lname}</JerseyName>
								<JerseyNumber>{myTeam.sixth.jersey}</JerseyNumber>
								<Icon>
									<GiTankTop size={200} />
								</Icon>
							</JerseyContainer>
						</div>
					) : (
						''
					)}{' '}
				</Bench>
			</Container>

			<Roster>
				<>
					{myPlayers.length !== 0 &&
						myPlayers.map((player) => {
							return (
								<Wrapper>
									<BtnDiv>
										<DeleteBtn onClick={() => handleClick(player)}>
											<TiDelete size={20} />
										</DeleteBtn>
									</BtnDiv>
									<p>{player.position}</p>
									<p>
										{player.fname} {player.lname}
									</p>
									<p>{player.jersey}</p>
									<GiTankTop size={100} />
								</Wrapper>
							);
						})}
				</>
			</Roster>
		</>
	);
};

const Title = styled.h1`
	font-size: x-large;
	margin: 10px 0 0 20px;
	text-decoration: underline;
`;

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 80px;
`;

const PointGuard = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;
const ShootingGuard = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;
const SmallForward = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;
const PowerForward = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;
const Center = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;
const Bench = styled.div`
	text-align: center;
	width: calc(100% / 6);
	height: 400px;
`;

const Roster = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 250px);
	grid-gap: 20px;
	margin: 10px 15px;
	justify-content: center;
`;
const Wrapper = styled.div`
	border: 2px solid gray;
	text-align: center;
	padding: 10px;
	height: 200px;
`;

const DeleteBtn = styled.button`
	border: none;
	background-color: #f3f4f9;
	&:hover {
		color: red;
	}
`;

const BtnDiv = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Icon = styled.div`
	margin-top: 80px;
	color: #5f9df7;
`;

const JerseyContainer = styled.div`
	position: relative;
`;

const JerseyName = styled.h2`
	position: absolute;
	color: #fff7e9;
	top: 45%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
const JerseyNumber = styled.h1`
	font-size: xx-large;
	position: absolute;
	color: #fff7e9;
	top: 65%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
export default TeamCreation;
