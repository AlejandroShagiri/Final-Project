import { FaSearch, FaUserAlt } from 'react-icons/fa';
import { SiNba } from 'react-icons/si';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Searchbar from './Searchbar';

const Navbar = () => {
	return (
		<>
			<Container>
				<Logo>
					<Nav to={'/'}>
						<h2>Today</h2>
					</Nav>
				</Logo>
				<ItemContainer>
					<List>
						<Item>
							<Nav to={'/score'}>Score</Nav>
						</Item>
						<Item>
							<Nav to={'/schedule'}>Schedule</Nav>
						</Item>
						<Item>
							<Nav to={'/players'}>Players</Nav>
						</Item>
						<Item>
							<Nav to={'/teamcreation'}>Team creation</Nav>
						</Item>
						<Item>
							<Nav to={'/archive'}>Archive</Nav>
						</Item>
					</List>
				</ItemContainer>
				<BtnContainer>
					<List>
						<Item>
							<BtnIcons>
								<Searchbar />
							</BtnIcons>
						</Item>
						<Item>
							<BtnIcons>
								<FaUserAlt size={25} />
							</BtnIcons>
						</Item>
					</List>
				</BtnContainer>
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
	color: white;
	justify-content: space-between;
`;
const Logo = styled.div`
	display: flex;
	color: #082032;
`;
const BtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-right: 10px;
`;
const ItemContainer = styled.div`
	display: flex;
	justify-content: space-around;
`;

const List = styled.div`
	display: flex;
	text-decoration: none;
	list-style: none;
	align-items: center;
`;

const Item = styled.li`
	color: #082032;
	text-decoration: none;
	margin-left: 2rem;
	font-weight: bold;
`;

const BtnIcons = styled.button`
	border-radius: 10px;
	color: #a9a9a9;
	background-color: #f3f4f9;
	border: none;
	cursor: pointer;
	height: 40px;
	width: 40px;
	&.active {
		color: #082032;
	}
`;
const Nav = styled(NavLink)`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	text-decoration: none;
	color: #a9a9a9;
	padding: 1rem;

	&:hover {
		color: #082032;
	}
	&.active {
		color: #082032;
	}
`;

export default Navbar;
