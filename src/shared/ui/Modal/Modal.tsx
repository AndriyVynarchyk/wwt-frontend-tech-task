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
			className={`mx-auto mt-auto mb-0 h-[calc(100dvh-2rem)] max-h-none w-full max-w-none flex-col rounded-t-2xl md:m-auto md:h-fit md:max-h-[calc(100dvh-2rem)] md:w-[calc(100%-2rem)] md:max-w-7xl md:rounded-2xl bg-white shadow-100 backdrop:bg-black/40 backdrop:backdrop-blur-sm open:flex ${className}`}
		>
			<div className="flex min-h-0 grow flex-col gap-5 p-5 pb-20 md:gap-8 md:p-8">
				<header className="grid min-h-12 grid-cols-[1fr_auto_1fr] items-center gap-4">
					<h2
						id={titleId}
						className="col-start-2 text-center text-body-3 text-grey-500 md:text-headline-2"
					>
						{title}
					</h2>
					<button
						type="button"
						aria-label={t('close')}
						onClick={onClose}
						className="col-start-3 -m-2 cursor-pointer justify-self-end rounded-sm p-2 text-grey-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
					>
						<CloseIcon
							aria-hidden="true"
							className="size-4 md:size-6"
						/>
					</button>
				</header>

				{children && <div className="grow overflow-y-auto">{children}</div>}

				{footer && <footer className="mt-auto">{footer}</footer>}
			</div>
		</dialog>
	)
}
