import styled from 'styled-components';
const TeamCreation = () => {
	return (
		<>
			<h1>Your team!</h1>
			<Container>
				<PointGuard> PG </PointGuard>
				<ShootingGuard> SG </ShootingGuard>
				<SmallForward> SF </SmallForward>
				<PowerForward> PF </PowerForward>
				<Center> C </Center>
				<Bench> 6th </Bench>
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
	border: 2px solid red;
	height: 94vh;
`;

const PointGuard = styled.div`
	text-align: center;
	border: 2px solid black;
	width: calc(100% / 6);
`;
const ShootingGuard = styled.div`
	text-align: center;
	border: 2px solid green;
	width: calc(100% / 6);
`;
const SmallForward = styled.div`
	text-align: center;
	border: 2px solid blue;
	width: calc(100% / 6);
`;
const PowerForward = styled.div`
	text-align: center;
	border: 2px solid orange;
	width: calc(100% / 6);
`;
const Center = styled.div`
	text-align: center;
	border: 2px solid yellow;
	width: calc(100% / 6);
`;
const Bench = styled.div`
	text-align: center;
	border: 2px solid pink;
	width: calc(100% / 6);
`;
export default TeamCreation;
