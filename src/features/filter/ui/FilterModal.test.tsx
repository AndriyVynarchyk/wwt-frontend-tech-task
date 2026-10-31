import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { FilterType } from '@/shared/api/types/Filter'
import type { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

import { useFilterStore } from '../model/filterStore'
import { FilterModal } from './FilterModal'

const appliedFilter: SearchRequestFilter = [
	{ id: 'MEAL_OPTIONS', type: FilterType.OPTION, optionsIds: ['dinner'] }
]

const renderFilterModal = () => {
	const onClose = vi.fn()

	render(
		<QueryClientProvider client={new QueryClient()}>
			<FilterModal
				open
				onClose={onClose}
			/>
		</QueryClientProvider>
	)

	return { onClose, user: userEvent.setup() }
}

const getCheckbox = (name: string) => screen.findByRole('checkbox', { name })

const getConfirmDialog = () =>
	screen.getByRole('dialog', { name: 'Do you want to apply new filter' })

beforeEach(() => {
	useFilterStore.setState({ filter: [] })
})

describe('FilterModal', () => {
	it('pre-fills the modal with the applied filter', async () => {
		useFilterStore.setState({ filter: appliedFilter })
		renderFilterModal()

		expect(await getCheckbox('Dinner included')).toBeChecked()
		expect(await getCheckbox('Breakfast included')).not.toBeChecked()
	})

	it('saves the selection after confirming', async () => {
		const { onClose, user } = renderFilterModal()

		await user.click(await getCheckbox('Breakfast included'))
		await user.click(screen.getByRole('button', { name: 'Apply' }))
		await user.click(
			within(getConfirmDialog()).getByRole('button', {
				name: 'Apply new filter'
			})
		)

		expect(useFilterStore.getState().filter).toEqual([
			{ id: 'MEAL_OPTIONS', type: FilterType.OPTION, optionsIds: ['breakfast'] }
		])
		expect(onClose).toHaveBeenCalled()
	})

	it('keeps the applied filter when using the old one', async () => {
		useFilterStore.setState({ filter: appliedFilter })
		const { onClose, user } = renderFilterModal()

		await user.click(await getCheckbox('Breakfast included'))
		await user.click(screen.getByRole('button', { name: 'Apply' }))
		await user.click(
			within(getConfirmDialog()).getByRole('button', {
				name: 'Use old filter'
			})
		)

		expect(useFilterStore.getState().filter).toEqual(appliedFilter)
		expect(onClose).toHaveBeenCalled()
	})

	it('returns to the draft when the confirm dialog is dismissed', async () => {
		const { onClose, user } = renderFilterModal()

		await user.click(await getCheckbox('Breakfast included'))
		await user.click(screen.getByRole('button', { name: 'Apply' }))
		const confirmDialog = getConfirmDialog()
		await user.click(
			within(confirmDialog).getByRole('button', { name: 'Close' })
		)

		expect(confirmDialog).not.toHaveAttribute('open')
		expect(await getCheckbox('Breakfast included')).toBeChecked()
		expect(useFilterStore.getState().filter).toEqual([])
		expect(onClose).not.toHaveBeenCalled()
	})

	it('clears all selected options', async () => {
		useFilterStore.setState({ filter: appliedFilter })
		const { user } = renderFilterModal()

		await user.click(await getCheckbox('Dinner included'))
		await user.click(
			screen.getByRole('button', { name: 'Clear all parameters' })
		)

		expect(await getCheckbox('Dinner included')).not.toBeChecked()
	})
})
