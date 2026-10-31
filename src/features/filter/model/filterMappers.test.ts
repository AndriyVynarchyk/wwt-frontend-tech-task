import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { draftToFilter, filterToDraft } from './filterMappers'

const filter: SearchRequestFilter = [
	{
		id: 'MEAL_OPTIONS',
		type: FilterType.OPTION,
		optionsIds: ['breakfast', 'dinner']
	},
	{ id: 'BED_TYPE', type: FilterType.OPTION, optionsIds: ['twin'] }
]

describe('filterToDraft', () => {
	it('maps each filter to its selected option ids', () => {
		expect(filterToDraft(filter)).toEqual({
			MEAL_OPTIONS: ['breakfast', 'dinner'],
			BED_TYPE: ['twin']
		})
	})

	it('returns an empty draft for an empty filter', () => {
		expect(filterToDraft([])).toEqual({})
	})
})

describe('draftToFilter', () => {
	it('maps each draft entry to an option filter', () => {
		expect(
			draftToFilter({
				MEAL_OPTIONS: ['breakfast', 'dinner'],
				BED_TYPE: ['twin']
			})
		).toEqual(filter)
	})

	it('drops filters with no selected options', () => {
		expect(draftToFilter({ MEAL_OPTIONS: [], BED_TYPE: ['twin'] })).toEqual([
			{ id: 'BED_TYPE', type: FilterType.OPTION, optionsIds: ['twin'] }
		])
	})

	it('keeps the filter unchanged after a round trip through the draft', () => {
		expect(draftToFilter(filterToDraft(filter))).toEqual(filter)
	})
})
