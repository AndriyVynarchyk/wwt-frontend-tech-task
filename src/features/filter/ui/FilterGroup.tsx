import type { FilterItem } from '@/shared/api/types/Filter'
import { Checkbox } from '@/shared/ui/Checkbox'

import { FilterInfoTooltip } from './FilterInfoTooltip'

type FilterGroupProps = {
	filterItem: FilterItem
	isSelected: (optionId: string) => boolean
	onToggle: (optionId: string) => void
}

export const FilterGroup = ({
	filterItem,
	isSelected,
	onToggle
}: FilterGroupProps) => (
	<fieldset>
		<legend className="mb-6 flex items-start gap-1.5 text-headline-5 text-grey-500">
			<h3>{filterItem.name}</h3>
			{filterItem.description && (
				<FilterInfoTooltip
					name={filterItem.name}
					description={filterItem.description}
				/>
			)}
		</legend>
		<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
			{filterItem.options.map(option => (
				<div
					key={option.id}
					className="flex items-start gap-1.5"
				>
					<Checkbox
						label={option.name}
						checked={isSelected(option.id)}
						onChange={() => onToggle(option.id)}
					/>
					{option.description && (
						<FilterInfoTooltip
							name={option.name}
							description={option.description}
						/>
					)}
				</div>
			))}
		</div>
	</fieldset>
)
