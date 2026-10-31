import { Fragment, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/shared/ui/Button'
import { Checkbox } from '@/shared/ui/Checkbox'
import { LinkButton } from '@/shared/ui/LinkButton'
import { Modal } from '@/shared/ui/Modal'

import { useFilterItems } from '../api/useFilterItems'
import { draftToFilter, filterToDraft } from '../model/filterMappers'
import { useFilterStore } from '../model/filterStore'
import { useFilterDraft } from '../model/useFilterDraft'
import { FilterApplyConfirm } from './FilterApplyConfirm'

type FilterModalProps = {
	open: boolean
	onClose: () => void
}

export const FilterModal = ({ open, onClose }: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const { data: filterItems, isPending, isError } = useFilterItems()
	const { draft, isSelected, toggleOption, resetDraft } = useFilterDraft()
	const setFilter = useFilterStore(state => state.setFilter)
	const [isConfirmOpen, setIsConfirmOpen] = useState(false)

	useEffect(() => {
		if (open) {
			resetDraft(filterToDraft(useFilterStore.getState().filter))
		}
	}, [open])

	const closeAll = () => {
		setIsConfirmOpen(false)
		onClose()
	}

	const handleConfirm = () => {
		setFilter(draftToFilter(draft))
		closeAll()
	}

	return (
		<>
			<Modal
				open={open}
				onClose={onClose}
				title={t('title')}
				footer={
					<div className="flex flex-col-reverse items-center gap-4 md:grid md:grid-cols-[1fr_auto_1fr]">
						<Button
							size="lg"
							className="w-full md:col-start-2 md:w-46"
							onClick={() => setIsConfirmOpen(true)}
						>
							{t('applyButton')}
						</Button>
						<LinkButton
							className="md:col-start-3 md:justify-self-end"
							onClick={() => resetDraft()}
						>
							{t('clearAllButton')}
						</LinkButton>
					</div>
				}
			>
				<div className="flex flex-col gap-8">
					<hr className="border-t-2 border-grey-200" />

					{isPending && <p>{t('loading')}</p>}
					{isError && <p role="alert">{t('loadError')}</p>}

					{filterItems?.map(filterItem => (
						<Fragment key={filterItem.id}>
							<fieldset>
								<legend className="mb-6 text-headline-5 text-grey-500">
									<h3>{filterItem.name}</h3>
								</legend>
								<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
									{filterItem.options.map(option => (
										<Checkbox
											key={option.id}
											label={option.name}
											checked={isSelected(filterItem.id, option.id)}
											onChange={() => toggleOption(filterItem.id, option.id)}
										/>
									))}
								</div>
							</fieldset>
							<hr className="border-t-2 border-grey-200" />
						</Fragment>
					))}
				</div>
			</Modal>

			{/* A sibling, not a child: React propagates a nested dialog's close event to ancestor onClose handlers */}
			<FilterApplyConfirm
				open={isConfirmOpen}
				onConfirm={handleConfirm}
				onDiscard={closeAll}
				onClose={() => setIsConfirmOpen(false)}
			/>
		</>
	)
}
