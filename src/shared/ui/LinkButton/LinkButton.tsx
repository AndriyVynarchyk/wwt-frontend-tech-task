import type { ComponentProps } from 'react'

export const LinkButton = ({
	type = 'button',
	className = '',
	...props
}: ComponentProps<'button'>) => (
	<button
		type={type}
		className={`cursor-pointer text-link text-primary-100 underline enabled:hover:text-grey-300 enabled:active:text-grey-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 ${className}`}
		{...props}
	/>
)
