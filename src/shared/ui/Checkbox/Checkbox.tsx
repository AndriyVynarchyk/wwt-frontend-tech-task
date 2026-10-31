import type { ComponentProps, ReactNode } from 'react'

import CheckboxCheckedIcon from '@/shared/assets/icons/checkbox-checked.svg'
import CheckboxIcon from '@/shared/assets/icons/checkbox.svg'

type CheckboxProps = Omit<ComponentProps<'input'>, 'type'> & {
	label: ReactNode
}

const ICON_FOCUS_CLASSES =
	'rounded-xs peer-focus-visible:outline-2 peer-focus-visible:outline-brand-200'

export const Checkbox = ({
	label,
	className = '',
	...props
}: CheckboxProps) => (
	<label
		className={`group relative flex cursor-pointer items-center gap-2 text-body-6 text-grey-500 md:text-body-4 has-disabled:cursor-not-allowed ${className}`}
	>
		<input
			type="checkbox"
			className="peer sr-only"
			{...props}
		/>
		<CheckboxIcon
			aria-hidden="true"
			className={`size-6 shrink-0 fill-white text-grey-500 peer-checked:hidden peer-enabled:group-hover:fill-grey-100 peer-disabled:fill-grey-200 peer-disabled:text-grey-200 ${ICON_FOCUS_CLASSES}`}
		/>
		<CheckboxCheckedIcon
			aria-hidden="true"
			className={`hidden size-6 shrink-0 text-grey-500 peer-checked:block peer-disabled:text-grey-200 ${ICON_FOCUS_CLASSES}`}
		/>
		{label}
	</label>
)
