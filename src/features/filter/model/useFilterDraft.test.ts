import { act, renderHook } from '@testing-library/react'

import { useFilterDraft } from './useFilterDraft'

describe('useFilterDraft', () => {
	it('starts with an empty draft', () => {
		const { result } = renderHook(() => useFilterDraft())

		expect(result.current.draft).toEqual({})
		expect(result.current.isSelected('MEAL_OPTIONS', 'breakfast')).toBe(false)
	})

	it('selects an option on the first toggle', () => {
		const { result } = renderHook(() => useFilterDraft())

		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))

		expect(result.current.draft).toEqual({ MEAL_OPTIONS: ['breakfast'] })
		expect(result.current.isSelected('MEAL_OPTIONS', 'breakfast')).toBe(true)
	})

	it('deselects an option on the second toggle', () => {
		const { result } = renderHook(() => useFilterDraft())

		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))
		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))

		expect(result.current.isSelected('MEAL_OPTIONS', 'breakfast')).toBe(false)
	})

	it('keeps selections in different filters independent', () => {
		const { result } = renderHook(() => useFilterDraft())

		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))
		act(() => result.current.toggleOption('BED_TYPE', 'twin'))
		act(() => result.current.toggleOption('MEAL_OPTIONS', 'dinner'))

		expect(result.current.draft).toEqual({
			MEAL_OPTIONS: ['breakfast', 'dinner'],
			BED_TYPE: ['twin']
		})
	})

	it('replaces the draft on reset', () => {
		const { result } = renderHook(() => useFilterDraft())

		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))
		act(() => result.current.resetDraft({ BED_TYPE: ['twin'] }))

		expect(result.current.draft).toEqual({ BED_TYPE: ['twin'] })
	})

	it('clears the draft on reset without arguments', () => {
		const { result } = renderHook(() => useFilterDraft())

		act(() => result.current.toggleOption('MEAL_OPTIONS', 'breakfast'))
		act(() => result.current.resetDraft())

		expect(result.current.draft).toEqual({})
	})
})
