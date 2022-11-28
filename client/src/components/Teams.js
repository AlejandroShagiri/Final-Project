import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

const Teams = () => {
	const [teamArr, setTeamArr] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		fetch(`/api/get-teams`)
			.then((res) => res.json())
			.then((data) => {
				setTeamArr(data.data);
				console.log(data);
			});
	}, []);

	return (
		<>
			=<h1>Please chose a team</h1>
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
									</ButtonStyle>
								</>
							);
						})}
				</Container>
			</div>
		</>
	);
};

const Container = styled.div`
	border: 2px solid red;

	justify-content: space-evenly;
	align-items: center;
`;

const Logo = styled.img`
	height: 200px;
`;

const Nav = styled(NavLink)`
	color: white;
`;

const ButtonStyle = styled.button`
	background-color: white;
	outline: none;
	&:hover {
		background-color: gray;
	}
`;
export default Teams;
