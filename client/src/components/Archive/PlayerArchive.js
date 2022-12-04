import { useState, useEffect } from 'react';
import styled from 'styled-components';

const PlayerArchive = (allPlayers) => {
	const [teamArr, setTeamArr] = useState([]);
	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
			});
	}, []);
	return (
		<>
			<MainDiv>
				{allPlayers.length !== 0 &&
					teamArr.length !== 0 &&
					allPlayers.data.map((players) => {
						return (
							<Wrapper>
								<Container>
									<ImgStyling
										src={
											teamArr.find(
												(team) => team.name === players.team.full_name
											).logo
										}
									/>
									{players.team.full_name}
								</Container>
								<NameDiv>
									{players.first_name} {players.last_name}
								</NameDiv>
							</Wrapper>
						);
					})}
			</MainDiv>
		</>
	);
};

const MainDiv = styled.div`
	margin-top: 20px;
	display: grid;
	grid-template-columns: repeat(3, 500px);
	justify-content: space-evenly;
	grid-gap: 20px;
	align-items: center;
`;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const ImgStyling = styled.img`
	height: 75px;
`;
const Wrapper = styled.div`
	border-radius: 15px;
	background-color: #d5ddf3;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border: 2px solid gray;
	padding: 20px;
`;

const NameDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: x-large;
`;
export default PlayerArchive;
