let secret = process.env.REACT_APP_FAUNADB_SECRET_KEY;

const getPalettes = async () => {
	const query = `
    {
        allPalettes {
          data {
            _id
            paletteName
            id
            emoji
            colors {
              data {
                _id
                name
                color
              }
            }
          }
        }
    }`;
	return executeQuery(query).then(result => result.data.allPalettes.data);
};

const createPalette = async newPalette => {
	const query = `
    mutation CreatePalette {
      createPalette(
        data: {
          paletteName: "${newPalette.paletteName}"
          id: "${newPalette.id}"
          emoji: "${newPalette.emoji}"
          colors: {
            create: [
              ${newPalette.colors.map(
															color =>
																'{ name: "' + color.name + '", color: "' + color.color + '" }'
														)}
            ]
          }
        }
      ) {
        _id
      }
    }
  `;
	return executeQuery(query).then(result => result.data);
};

const deletePalette = async id => {
	const query = `
    mutation {
      deletePalette(id: "${id}"){
        id
      }
    }
  `;
	return executeQuery(query).then(result => result.data);
};

const deleteColors = async colorsIds => {
	const deleteQueries = colorsIds.map(
		(id, index) => `id${index + 1}: deleteColor(id: "${id}"){name}`
	);
	const query = `
    mutation deleteMultiple {
      ${deleteQueries}
    }
  `;
	return executeQuery(query.replace(',', '')).then(result => result.data);
};

const executeQuery = async query => {
	return fetch('https://graphql.us.fauna.com/graphql', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + secret,
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ query: query })
	}).then(el => el.json());
};

export { getPalettes, createPalette, deletePalette, deleteColors };
