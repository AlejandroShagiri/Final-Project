import { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';

const GameArchive = (allGames) => {
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
			{allGames.length !== 0 &&
				teamArr.length !== 0 &&
				allGames.data.map((games) => {
					return (
						<>
							<MainDiv>
								<Wrapper>
									<DateWrapper>
										<DateDiv>{moment(games.date).format(`YYYY-MM-DD`)}</DateDiv>
									</DateWrapper>
									<Container>
										<TeamContainer>
											<ImgStyling
												src={
													teamArr.find(
														(team) => team.name === games.home_team.full_name
													).logo
												}
											/>
											<NameDiv>{games.home_team.full_name}</NameDiv>
											<ScoreDiv>{games.home_team_score} </ScoreDiv>
										</TeamContainer>
										vs
										<TeamContainer>
											<ImgStyling
												src={
													teamArr.find(
														(team) => team.name === games.visitor_team.full_name
													).logo
												}
											/>
											<NameDiv>{games.visitor_team.full_name}</NameDiv>
											<ScoreDiv>{games.visitor_team_score}</ScoreDiv>
										</TeamContainer>
									</Container>
								</Wrapper>
							</MainDiv>
						</>
					);
				})}
		</>
	);
};

const MainDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
	border-radius: 30px;
	background-color: #d8e3e9;
	width: 500px;
`;

const DateWrapper = styled.div`
	background-color: orange;
	width: 200px;
`;
const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TeamContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 20px;
`;
const DateDiv = styled.div`
	display: flex;
	justify-content: center;
	font-size: x-large;
`;

const ImgStyling = styled.img`
	height: 100px;
`;

const NameDiv = styled.div`
	font-size: large;
	margin: 10px 0px;
`;
const ScoreDiv = styled.div`
	display: flex;
	justify-content: center;
	font-size: x-large;
`;
export default GameArchive;
