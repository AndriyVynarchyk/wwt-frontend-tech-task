import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'
import { Modal } from '@/shared/ui/Modal'

type FilterApplyConfirmProps = {
	open: boolean
	onConfirm: () => void
	onDiscard: () => void
	onClose: () => void
}

export const FilterApplyConfirm = ({
	open,
	onConfirm,
	onDiscard,
	onClose
}: FilterApplyConfirmProps) => {
	const { t } = useTranslation('filter')

	return (
		<Modal
			open={open}
			onClose={onClose}
			title={t('confirmTitle')}
			footer={
				<div className="flex flex-col-reverse justify-center gap-4 pt-8 sm:flex-row sm:gap-8 md:pt-20">
					<Button
						variant="outline-grey"
						size="lg"
						className="sm:w-70"
						onClick={onDiscard}
					>
						{t('confirmCancelButton')}
					</Button>
					<Button
						size="lg"
						className="sm:w-70"
						onClick={onConfirm}
					>
						{t('confirmApplyButton')}
					</Button>
				</div>
			}
		/>
	)
}
