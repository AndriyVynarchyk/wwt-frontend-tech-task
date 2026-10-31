import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AppliedFilter, FilterModal } from '@/features/filter'
import { Button } from '@/shared/ui/Button'

import homeHero from '../assets/home-hero.webp'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	return (
		<main>
			<section className="relative isolate flex min-h-80 flex-col items-center justify-center gap-8 px-4 pt-12 pb-24 md:min-h-[500px] md:pb-32">
				<img
					src={homeHero}
					alt=""
					className="absolute inset-0 -z-10 size-full object-cover"
				/>
				{/* eslint-disable-next-line i18next/no-literal-string */}
				<h1 className="text-center text-4xl font-semibold text-balance text-white drop-shadow-md md:text-6xl">
					WinWinTravel frontend test task
				</h1>
				<Button
					size="lg"
					onClick={() => setIsFilterOpen(true)}
				>
					{t('openButton')}
				</Button>
			</section>

			<section className="relative mx-auto -mt-12 w-full max-w-3xl px-4 pb-8 md:-mt-20 md:pb-12">
				<AppliedFilter />
			</section>

			<FilterModal
				open={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
			/>
		</main>
	)
}
