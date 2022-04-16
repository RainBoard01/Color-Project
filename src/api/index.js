import dotenv from 'dotenv';
dotenv.config();

const apiHostname = process.env.API_HOSTNAME;
const apiPort = process.env.API_PORT;

const getPalettes = async () => {
	const query = `
    {
      allPalettes {
        _id
        paletteName
        id
        emoji
        colors {
          _id
          name
          color
        }
      }
    }`;
	return await executeQuery(query).then(result => result.data.allPalettes);
};

const createPalette = async newPalette => {
	const query = `
    mutation CreatePalette {
      createPalette(data: {
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
      }) {
        _id
      }
    }
  `;
	return await executeQuery(query).then(result => result.data.createPalette);
};

const deletePalette = async id => {
	const query = `
    mutation {
      deletePalette(id: "${id}"){
        id
      }
    }
  `;
	return await executeQuery(query).then(result => result.data.deletePalette);
};

const executeQuery = async query => {
	return await fetch(`${apiHostname}:${apiPort}/graphql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({ query: query })
	}).then(res => res.json());
};

export { getPalettes, createPalette, deletePalette };
