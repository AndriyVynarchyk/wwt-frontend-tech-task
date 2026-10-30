import type { ComponentProps } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'outline-grey'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ComponentProps<'button'> & {
	variant?: ButtonVariant
	size?: ButtonSize
}

const BASE_CLASSES =
	'inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200 disabled:cursor-not-allowed'

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary:
		'bg-brand-200 text-white enabled:hover:bg-brand-100 enabled:active:bg-brand-300 disabled:bg-grey-100 disabled:text-grey-300',
	outline:
		'border-2 border-brand-200 bg-white text-brand-200 enabled:hover:border-brand-300 enabled:hover:text-brand-300 enabled:active:border-brand-200 enabled:active:bg-brand-200 enabled:active:text-white disabled:border-grey-200 disabled:bg-grey-100 disabled:text-grey-300',
	'outline-grey':
		'border-2 border-grey-200 bg-white text-grey-400 enabled:hover:bg-grey-100 enabled:active:border-brand-300 enabled:active:bg-transparent enabled:active:text-brand-300 disabled:border-grey-300 disabled:bg-grey-200'
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
	sm: 'h-10 px-4',
	md: 'h-12 px-6',
	lg: 'h-12 px-8 md:h-16'
}

export const Button = ({
	variant = 'primary',
	size = 'md',
	type = 'button',
	className = '',
	...props
}: ButtonProps) => (
	<button
		type={type}
		className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
		{...props}
	/>
)
