import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';

const Teams = ({ userId }) => {
	const [teamArr, setTeamArr] = useState([]);
	const [favourite, setFavourite] = useState([]);
	const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
	const navigate = useNavigate();
	const [favArray, setFavArray] = useState([]);
	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
				console.log(data);
				fetch(`/api/favourite`)
					.then((res) => res.json())
					.then((data) => {
						setFavArray(data.data);
					});
			});
	}, []);

	const handleClick = (e, team) => {
		console.log(team);
		e.preventDefault();
		e.stopPropagation();
		fetch(`/api/favourite`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email,
				userId: '12346',
				team,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				setFavArray(response.array);
				console.log(response.array);
			})

			.catch((error) => {
				window.alert(error);
			});
	};

	return (
		<>
			<TitleDiv>
				<Title>Please chose a team</Title>
			</TitleDiv>
			<div>
				<Container>
					{teamArr.length !== 0 &&
						teamArr.map((teams) => {
							// console.log(favArray);
							return (
								<>
									<ButtonStyle
										onClick={(event) => {
											console.log(teams);
											navigate(`/team/${teams.balldontlieID}/${teams.color}`);
											event.preventDefault();
											event.stopPropagation();
										}}
									>
										<Favourite
											isFav={favArray.includes(teams._id)}
											onClick={(e) => {
												handleClick(e, teams);
												e.stopPropagation();
												e.preventDefault();
											}}
										>
											{console.log(favArray.includes(teams._id))}
											<AiFillStar size={30} />
										</Favourite>
										<Logo src={teams.logo} />
									</ButtonStyle>
								</>
							);
						})}
				</Container>
			</div>
		</>
	);
};

const TitleDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 45px;
`;

const Title = styled.h1`
	font-size: xx-large;
	background-color: #082032;
	border-radius: 15px;
	padding: 10px;
	color: white;
`;
const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(5, 350px);
	grid-gap: 20px;
	margin: 10px 15px;
	justify-content: space-evenly;
	align-items: center;
`;

const Logo = styled.img`
	width: 50%;
	aspect-ratio: 3/2;
	object-fit: contain;
`;

const Nav = styled(NavLink)`
	color: white;
`;

const ButtonStyle = styled.button`
	background-color: white;
	outline: none;
	border-radius: 15px;
	&:hover {
		background-color: gray;
	}
	padding-bottom: 30px;
`;

const Favourite = styled.div`
	margin: 10px 0 0 10px;
	display: flex;
	color: ${(props) => (props.isFav ? 'gold' : '')};
	&:hover {
		color: gold;
		opacity: 100%;
	}
`;
export default Teams;
