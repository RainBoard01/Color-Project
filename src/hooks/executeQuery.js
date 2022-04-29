const apiHostname = process.env.REACT_APP_API_HOSTNAME;
const apiPort = process.env.REACT_APP_API_PORT;

export const executeQuery = async query =>
	await fetch(`${apiHostname}:${apiPort}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ query: query })
	})
		.then(res => res.json())
		.catch(err => console.log(err));
