import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

const Schedule = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [scores, setScores] = useState([]);
	const [teamArr, setTeamArr] = useState([]);

	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
			});
	}, []);

	const dayGame = (aDate) => {
		let date = moment(aDate).format(`YYYY-MM-DD`);
		fetch(
			`https://www.balldontlie.io/api/v1/games?start_date=${date}&end_date=${date}`
		)
			.then((response) => response.json())
			.then((data) => {
				setScores(data);
			})
			.catch((err) => console.error(err));
	};

	return (
		<MainDiv>
			<h1>Please chose a date</h1>
			<DatePicker
				selected={startDate}
				onChange={(date) => {
					setScores([]);
					setStartDate(date);
					dayGame(date);
				}}
			/>
			<GamesDiv>
				<div>
					{scores.length !== 0 &&
						teamArr.length !== 0 &&
						scores.data.map((games) => {
							return (
								<Container>
									<Wrapper>
										<InfoDiv>
											<TeamDiv>
												<ImgStyling
													src={
														teamArr.find(
															(team) => team.name === games.home_team.full_name
														).logo
													}
												/>
												<TeamNames>{games.home_team.full_name}</TeamNames>
												<h1>{games.home_team_score}</h1>
											</TeamDiv>

											<TeamDiv>
												<ImgStyling
													src={
														teamArr.find(
															(team) =>
																team.name === games.visitor_team.full_name
														).logo
													}
												/>
												<TeamNames>{games.visitor_team.full_name}</TeamNames>
												<h1>{games.visitor_team_score}</h1>
											</TeamDiv>
										</InfoDiv>
										<h2>vs</h2>
									</Wrapper>
								</Container>
							);
						})}
				</div>
			</GamesDiv>
		</MainDiv>
	);
};

const MainDiv = styled.div`
	margin: 0 15px;
`;
const GamesDiv = styled.div`
	height: 90vh;
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;
const Wrapper = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #d8e3e9;
	border-radius: 10px;
	padding: 32px;
	min-width: 450px;
	gap: 20px;
`;

const InfoDiv = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	gap: 20px;
`;

const ImgStyling = styled.img`
	height: 100px;
`;

const TeamNames = styled.h1`
	max-width: 120px;
	text-align: center;
`;

const TeamDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
`;

const Btn = styled.button`
	border: none;
	outline: none;
	border-radius: 30px;
	background-color: #3ec70b;
	padding: 10px 15px;

	color: white;
	&:hover {
		color: #082032;
	}
`;
export default Schedule;
