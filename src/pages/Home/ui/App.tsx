import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FilterModal } from '@/features/filter'
import { Button } from '@/shared/ui/Button'

import homeHero from '../assets/home-hero.webp'

export const App = () => {
	const { t } = useTranslation('filter')
	const [isFilterOpen, setIsFilterOpen] = useState(false)

	return (
		<main>
			<section className="relative isolate flex min-h-80 flex-col items-center justify-center gap-8 px-4 py-12 md:min-h-[500px]">
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

			<FilterModal
				open={isFilterOpen}
				onClose={() => setIsFilterOpen(false)}
			/>
		</main>
	)
}
