import { useMutation, useQueryClient } from 'react-query';
import { executeQuery } from './executeQuery';

export const useCreatePalette = () => {
	const queryClient = useQueryClient();
	const query = ({ paletteName, id, emoji, colors }) => `
    mutation CreatePalette {
      createPalette(data: {
        paletteName: "${paletteName}"
        id: "${id}"
        emoji: "${emoji}"
        colors: {
          create: [
            ${colors.map(
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
	return useMutation(newPalette => executeQuery(query(newPalette)), {
		onError: (err, variables, previousValue) => {
			console.log(err);
			return queryClient.setQueryData('palettes', previousValue);
		},
		onSettled: () => {
			queryClient.invalidateQueries('palettes');
		}
	});
};
