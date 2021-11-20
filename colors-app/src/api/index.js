let secret = process.env.REACT_APP_FAUNADB_SECRET_KEY;

const getPalettes = async () => {
    const query = `
    {
        allPalettes {
          data {
            paletteName
            id
            emoji
            colors {
              data {
                name
                color
              }
            }
          }
        }
    }`
    return executeQuery(query).then(result => result.data.allPalettes.data);
};

const createPalette = async newPalette => {
  const query = `
    mutation CreatePalette {
      createPalette(
        data: {
          paletteName: "${ newPalette.paletteName }"
          id: "${ newPalette.id }"
          emoji: "${ newPalette.emoji }"
          colors: {
            create: [
              ${ newPalette.colors.map(color => "{ name: \""+color.name+"\", color: \""+color.color+"\" }")}
            ]
          }
        }
      ) {
        _id
      }
    }
  `
  return executeQuery(query).then(result => result.data);
}

const executeQuery = async query => {
    return fetch('https://graphql.us.fauna.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + secret,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({ query: query })
    }).then(el => {
        const res = el.json()
        return res
    })
}

export { getPalettes, createPalette };