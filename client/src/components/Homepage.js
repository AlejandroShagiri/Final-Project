import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Homepage = () => {
	const [games, setGames] = useState(undefined);

	useEffect(() => {}, []);
	return (
		<Container>
			<h1>This is the Homepage</h1>
		</Container>
	);
};

const Container = styled.div`
	margin: 10px;
`;
export default Homepage;
