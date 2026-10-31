import { useState } from 'react'

export type FilterDraft = Record<string, string[]>

export const useFilterDraft = () => {
	const [draft, setDraft] = useState<FilterDraft>({})

	const isSelected = (filterId: string, optionId: string) =>
		draft[filterId]?.includes(optionId) ?? false

	const toggleOption = (filterId: string, optionId: string) => {
		setDraft(currentDraft => {
			const selectedIds = currentDraft[filterId] ?? []

			return {
				...currentDraft,
				[filterId]: selectedIds.includes(optionId)
					? selectedIds.filter(selectedId => selectedId !== optionId)
					: [...selectedIds, optionId]
			}
		})
	}

	const resetDraft = (nextDraft: FilterDraft = {}) => setDraft(nextDraft)

	return { draft, isSelected, toggleOption, resetDraft }
}
