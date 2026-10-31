import { useTranslation } from 'react-i18next'

import InfoIcon from '@/shared/assets/icons/info.svg'
import { Tooltip } from '@/shared/ui/Tooltip'

type FilterInfoTooltipProps = {
	name: string
	description: string
}

export const FilterInfoTooltip = ({
	name,
	description
}: FilterInfoTooltipProps) => {
	const { t } = useTranslation('filter')

	return (
		<Tooltip
			label={t('moreInfo', { name })}
			content={
				<div className="flex flex-col gap-1">
					<p className="text-body-3 text-grey-500">{name}</p>
					<p className="text-body-7 text-grey-400">{description}</p>
				</div>
			}
		>
			<InfoIcon
				aria-hidden="true"
				className="size-4 text-grey-300"
			/>
		</Tooltip>
	)
}
