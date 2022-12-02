import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Homepage = () => {
	const [standing, setStanding] = useState([]);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'a19bf6f9ddmsheecbe7891105021p1ee2cdjsn5d9242e66a96',
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
		},
	};

	// fetch(
	// 	'https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&conference=east',
	// 	options
	// )
	// 	.then((response) => response.json())
	// 	.then((response) => {
	// 		setStanding(response);
	// 		console.log(response);
	// 	})
	// 	.catch((err) => console.error(err));

	useEffect(() => {}, []);
	return (
		<Container>
			<h1>This is the Homepage</h1>
			{standing.length !== 0 &&
				standing.response.map((rank) => {
					return (
						<Container>
							<Wrapper>
								<InfoDiv>
									<TeamDiv>
										<TeamNames>{rank.team.name}</TeamNames>
										<TeamNames>{rank.conference.rank}</TeamNames>
										<TeamNames>{rank.conference.win}</TeamNames>
										<TeamNames>{rank.conference.loss}</TeamNames>
									</TeamDiv>
								</InfoDiv>
							</Wrapper>
						</Container>
					);
				})}
		</Container>
	);
};

const Container = styled.div`
	margin: 10px;
`;

const Wrapper = styled.div``;

const InfoDiv = styled.div``;

const ImgStyling = styled.img``;

const TeamNames = styled.h1``;
const Btn = styled.button``;

const TeamDiv = styled.div``;
export default Homepage;
