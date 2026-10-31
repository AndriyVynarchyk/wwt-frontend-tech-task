import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import type { FilterDraft } from './types'

export const filterToDraft = (filter: SearchRequestFilter): FilterDraft =>
	Object.fromEntries(filter.map(({ id, optionsIds }) => [id, optionsIds]))

export const draftToFilter = (draft: FilterDraft): SearchRequestFilter =>
	Object.entries(draft)
		.filter(([, optionsIds]) => optionsIds.length > 0)
		.map(([id, optionsIds]) => ({ id, type: FilterType.OPTION, optionsIds }))
