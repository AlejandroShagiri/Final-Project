import { useState } from 'react';

const GamePerformance = () => {
	const [allStats, setAllStats] = useState([]);

	fetch(`https://www.balldontlie.io/api/v1/stats`)
		.then((response) => response.json())
		.then((data) => {
			setAllStats(data);
			console.log(data);
		})
		.catch((err) => console.error(err));

	return (
		<>
			{allStats.length !== 0 &&
				allStats.data.map((playerStats) => {
					return (
						<div>
							{playerStats.date}
							{playerStats.home_team_score}
							<div>
								{playersStats.first_name} {playersStats.last_name}{' '}
								{playerStats.position} {playerStats.pts} {playerStats.reb}{' '}
								{playerStats.ast}
								{playerStats.team.full_name}
							</div>

							{playerStats.date}
							{playerStats.visitor_team_score}
							<div>
								{playersStats.first_name} {playersStats.last_name}{' '}
								{playerStats.position} {playerStats.pts} {playerStats.reb}{' '}
								{playerStats.ast}
								{playerStats.team.full_name}
							</div>
						</div>
					);
				})}
		</>
	);
};

export default GamePerformance;
