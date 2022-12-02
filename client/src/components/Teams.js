import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Teams = ({ userId }) => {
	const [teamArr, setTeamArr] = useState([]);
	const [favourite, setFavourite] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
				console.log(data);
			});
	}, []);

	const handleClick = (e) => {
		e.stopPropagation();
		fetch(`/api/favourite/${userId}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: '12346',
				name: favourite.name,
				_id: favourite._id,
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
			<TitleDiv>
				<Title>Please chose a team</Title>
			</TitleDiv>
			<div>
				<Container>
					{teamArr.length !== 0 &&
						teamArr.map((teams) => {
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
										<Logo src={teams.logo} />
										<Favourite onClick={handleClick}>
											<AiFillStar size={30} />
										</Favourite>
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
`;

const Favourite = styled.a`
	border: none;
	opacity: 15%;
	&:hover {
		color: gold;
		opacity: 100%;
	}
`;
export default Teams;
