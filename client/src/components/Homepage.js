import { useEffect, useState } from 'react';
import styled from 'styled-components';
const { REACT_APP_NBAKEY } = process.env;

const Homepage = () => {
	const [standingEast, setStandingEast] = useState([]);
	const [standingWest, setStandingWest] = useState([]);
	const [teamArr, setTeamArr] = useState([]);
	const [favouriteTeam, setFavouriteTeam] = useState([]);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': REACT_APP_NBAKEY,
			'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
		},
	};

	// useEffect(() => {
	// 	fetch(
	// 		'https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&conference=east',
	// 		options
	// 	)
	// 		.then((response) => response.json())
	// 		.then((response) => {
	// 			setStandingEast(response.response);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, []);

	// useEffect(() => {
	// 	fetch(
	// 		'https://api-nba-v1.p.rapidapi.com/standings?league=standard&season=2022&conference=west',
	// 		options
	// 	)
	// 		.then((response) => response.json())
	// 		.then((response) => {
	// 			setStandingWest(response.response);
	// 		})
	// 		.catch((err) => console.error(err));
	// }, []);

	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
			});
	}, []);

	useEffect(() => {
		fetch(`/api/favourite`)
			.then((res) => res.json())
			.then((data) => {
				setFavouriteTeam(data.data);
			});
	}, []);

	useEffect(() => {}, []);
	return (
		<Container>
			<h1>This is the Homepage</h1>
			{favouriteTeam.length !== 0 &&
				favouriteTeam.map((favourite) => {
					return (
						<FavTeamDiv>
							<FavContainer>
								<h1>Your Favourite Team</h1>
								<FavDiv>
									<NameDiv>{favourite.team.name}</NameDiv>
									<ImgDiv>
										<ImgStyling src={favourite.team.logo} />
									</ImgDiv>
								</FavDiv>
							</FavContainer>
						</FavTeamDiv>
					);
				})}
			<StandingDiv>
				<EastDiv>
					<EastTitle>Eastern Conference</EastTitle>
					{standingEast.length !== 0 &&
						teamArr.length !== 0 &&
						standingEast.sort((a, b) => {
							if (a.conference.rank > b.conference.rank) {
								return 1;
							}
							if (a.conference.rank < b.conference.rank) {
								return -1;
							}
							return 0;
						}) &&
						standingEast.map((rank) => {
							return (
								<InfoDiv>
									<TeamDiv>
										<h1>Rank: {rank.conference.rank}</h1>
										<ImgDiv>
											<ImgStyling
												src={
													teamArr.find((team) => team.name === rank.team.name)
														.logo
												}
											/>
										</ImgDiv>
									</TeamDiv>
								</InfoDiv>
							);
						})}
				</EastDiv>
				<WestDiv>
					<WestTitle>Western Conference</WestTitle>
					{standingWest.length !== 0 &&
						teamArr.length !== 0 &&
						standingWest.sort((a, b) => {
							if (a.conference.rank > b.conference.rank) {
								return 1;
							}
							if (a.conference.rank < b.conference.rank) {
								return -1;
							}
							return 0;
						}) &&
						standingWest
							.map((rank) => {
								return (
									<InfoDiv>
										<TeamDiv>
											<h1>Rank: {rank.conference.rank}</h1>
											<ImgDiv>
												<ImgStyling
													src={
														teamArr.find((team) => team.name === rank.team.name)
															.logo
													}
												/>
											</ImgDiv>
										</TeamDiv>
									</InfoDiv>
								);
							})
							.sort()}
				</WestDiv>
			</StandingDiv>
		</Container>
	);
};

const Container = styled.div`
	margin: 0 15px;
`;

const StandingDiv = styled.div`
	margin-top: 20px;
	justify-content: center;
	display: grid;
	grid-template-columns: repeat(2, 500px);
`;

const EastTitle = styled.h1`
	text-align: center;
	background-color: #17408b;
	color: white;
`;
const EastDiv = styled.div`
	width: 200px;
`;

const WestTitle = styled.h1`
	text-align: center;
	background-color: #c9082a;
	color: white;
`;
const WestDiv = styled.div`
	width: 200px;
`;

const InfoDiv = styled.div`
	width: 200px;
	padding: 10px;
`;

const TeamDiv = styled.div``;

const ImgStyling = styled.img`
	width: 75px;
	margin-top: 5px;
`;
const ImgDiv = styled.div`
	display: flex;
	justify-content: center;
`;

const FavContainer = styled.div``;

const FavTeamDiv = styled.div`
	margin-top: 10px;
	background-color: #d8e3e9;
	width: 400px;
	border-radius: 15px;
	padding: 10px;
`;
const FavDiv = styled.div`
	display: grid;
	flex-direction: column;
	padding-top: 10px;
`;
const NameDiv = styled.div``;
export default Homepage;
