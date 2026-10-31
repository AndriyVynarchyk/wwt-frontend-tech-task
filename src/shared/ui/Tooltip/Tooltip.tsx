import { type ReactNode, useState } from 'react'

import {
	autoUpdate,
	flip,
	offset,
	shift,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole
} from '@floating-ui/react'

type TooltipProps = {
	label: string
	content: ReactNode
	children: ReactNode
}

export const Tooltip = ({ label, content, children }: TooltipProps) => {
	const [open, setOpen] = useState(false)

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		placement: 'top',
		// Fixed positioning keeps the tooltip from being clipped by a scrollable modal body
		strategy: 'fixed',
		middleware: [offset(8), flip({ padding: 8 }), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate
	})

	const { getReferenceProps, getFloatingProps } = useInteractions([
		useHover(context, { mouseOnly: true }),
		useClick(context, { ignoreMouse: true }),
		useFocus(context),
		useDismiss(context, { escapeKey: false }),
		useRole(context, { role: 'tooltip' })
	])

	return (
		<>
			<button
				ref={refs.setReference}
				type="button"
				aria-label={label}
				className="-m-2 inline-flex shrink-0 cursor-pointer rounded-full p-2 focus-ring"
				{...getReferenceProps()}
			>
				{children}
			</button>

			{open && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					className="z-10 w-max max-w-88 rounded-xl border border-grey-200 bg-white p-4"
					{...getFloatingProps()}
				>
					{content}
				</div>
			)}
		</>
	)
}
