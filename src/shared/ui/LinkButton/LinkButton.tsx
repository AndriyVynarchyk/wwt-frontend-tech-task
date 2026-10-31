import type { ComponentProps } from 'react'

export const LinkButton = ({
	type = 'button',
	className = '',
	...props
}: ComponentProps<'button'>) => (
	<button
		type={type}
		className={`cursor-pointer text-link text-primary-100 underline enabled:hover:text-grey-300 enabled:active:text-grey-500 focus-ring ${className}`}
		{...props}
	/>
)
