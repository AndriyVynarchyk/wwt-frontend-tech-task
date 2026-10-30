import { useQuery } from '@tanstack/react-query'

import { getFilterItems } from './getFilterItems'

export const useFilterItems = () =>
	useQuery({
		queryKey: ['filterItems'],
		queryFn: getFilterItems,
		staleTime: Infinity
	})
