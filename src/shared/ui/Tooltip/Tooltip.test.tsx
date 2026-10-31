import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Tooltip } from './Tooltip'

const renderTooltip = () => {
	render(
		<Tooltip
			label="More about Breakfast"
			content="Morning meal included"
		>
			<svg aria-hidden="true" />
		</Tooltip>
	)

	return {
		user: userEvent.setup(),
		trigger: screen.getByRole('button', { name: 'More about Breakfast' })
	}
}

describe('Tooltip', () => {
	it('stays hidden until the trigger is used', () => {
		renderTooltip()

		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens on mouse hover and closes when the pointer leaves', async () => {
		const { user, trigger } = renderTooltip()

		await user.hover(trigger)
		expect(screen.getByRole('tooltip')).toHaveTextContent(
			'Morning meal included'
		)

		await user.unhover(trigger)
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens on tap and closes on a tap outside', async () => {
		const { user, trigger } = renderTooltip()

		await user.pointer({ keys: '[TouchA]', target: trigger })
		expect(screen.getByRole('tooltip')).toBeInTheDocument()

		await user.pointer({ keys: '[TouchA]', target: document.body })
		expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
	})

	it('opens on keyboard focus', async () => {
		const { user } = renderTooltip()

		await user.tab()

		expect(screen.getByRole('tooltip')).toBeInTheDocument()
	})

	it('describes the trigger with the tooltip content', async () => {
		const { user, trigger } = renderTooltip()

		await user.hover(trigger)

		expect(trigger).toHaveAccessibleDescription('Morning meal included')
	})
})
