import {
	type MouseEvent,
	type ReactNode,
	useEffect,
	useId,
	useRef
} from 'react'
import { useTranslation } from 'react-i18next'

import CloseIcon from '@/shared/assets/icons/close.svg'

type ModalProps = {
	open: boolean
	onClose: () => void
	title: string
	children?: ReactNode
	footer?: ReactNode
	className?: string
}

export const Modal = ({
	open,
	onClose,
	title,
	children,
	footer,
	className = ''
}: ModalProps) => {
	const { t } = useTranslation()
	const dialogRef = useRef<HTMLDialogElement>(null)
	const titleId = useId()

	useEffect(() => {
		const dialog = dialogRef.current

		if (!dialog) {
			return
		}

		if (open && !dialog.open) {
			dialog.showModal()
		} else if (!open && dialog.open) {
			dialog.close()
		}
	}, [open])

	const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
		if (event.target === event.currentTarget) {
			onClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			onClose={onClose}
			onClick={handleBackdropClick}
			className={`m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-7xl flex-col gap-5 rounded-2xl p-5 md:gap-8 md:p-8 bg-white shadow-100 backdrop:bg-black/40 backdrop:backdrop-blur-sm open:flex ${className}`}
		>
			<header className="grid min-h-12 grid-cols-[1fr_auto_1fr] items-center gap-4">
				<h2
					id={titleId}
					className="col-start-2 text-center text-headline-2 text-grey-500"
				>
					{title}
				</h2>
				<button
					type="button"
					aria-label={t('close')}
					onClick={onClose}
					className="col-start-3 cursor-pointer justify-self-end rounded-sm text-grey-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
				>
					<CloseIcon
						aria-hidden="true"
						className="size-6"
					/>
				</button>
			</header>

			{children && <div className="overflow-y-auto">{children}</div>}

			{footer && <footer>{footer}</footer>}
		</dialog>
	)
}
