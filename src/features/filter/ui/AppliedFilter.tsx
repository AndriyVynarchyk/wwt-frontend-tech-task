import { useTranslation } from 'react-i18next'

import { useFilterStore } from '../model/filterStore'

export const AppliedFilter = () => {
	const { t } = useTranslation('filter')
	const filter = useFilterStore(state => state.filter)

	return (
		<div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-100 md:p-8">
			<h2 className="text-headline-5 text-grey-500">{t('selectedTitle')}</h2>
			<pre className="overflow-x-auto rounded-lg bg-grey-100 p-4 font-mono text-body-7 text-grey-500">
				{JSON.stringify(filter, null, 2)}
			</pre>
		</div>
	)
}
