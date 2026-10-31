import { create } from 'zustand'

import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

type FilterState = {
	filter: SearchRequestFilter
	setFilter: (filter: SearchRequestFilter) => void
}

export const useFilterStore = create<FilterState>()(set => ({
	filter: [],
	setFilter: filter => set({ filter })
}))
