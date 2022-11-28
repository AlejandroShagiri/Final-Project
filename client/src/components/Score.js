import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Score = () => {
	const [scores, setScores] = useState([]);
	const navigate = useNavigate();

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a19bf6f9ddmsheecbe7891105021p1ee2cdjsn5d9242e66a96',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
		},
	};

	// useEffect(() => {
	// 	fetch('https://api-nba-v1.p.rapidapi.com/games?date=2022-11-29', options)
	// 		.then((response) => response.json())
	// 		.then((response) => setScores(response))
	// 		.catch((err) => console.error(err));
	// }, []);

	return (
		<MainDiv>
			<h1>Featured Matches</h1>
			<div>
				{scores.length !== 0 &&
					scores.response.map((games) => {
						return (
							<Container>
								<Wrapper>
									<InfoDiv>
										<TeamDiv>
											<ImgStyling src={games.teams.home.logo} />
											<TeamNames>{games.teams.home.name}</TeamNames>
										</TeamDiv>

										<TeamDiv>
											<ImgStyling src={games.teams.visitors.logo} />
											<TeamNames>{games.teams.visitors.name}</TeamNames>
										</TeamDiv>
									</InfoDiv>
									<h2>vs</h2>
									<Btn
										onClick={(event) => {
											navigate('/scoreboard');
											event.preventDefault();
											event.stopPropagation();
										}}
									>
										See more
									</Btn>
								</Wrapper>
							</Container>
						);
					})}
			</div>
		</MainDiv>
	);
};

const MainDiv = styled.div`
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

const TeamDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex: 1;
`;
export default Score;
