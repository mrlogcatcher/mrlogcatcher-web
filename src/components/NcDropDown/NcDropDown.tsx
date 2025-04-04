'use client'

import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { FC, Fragment, ReactNode } from 'react'
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from '@headlessui/react'
import Link from 'next/link'

export interface NcDropDownItem<T = string> {
	id: T
	name: string
	icon: string
	href?: string
	isTargetBlank?: boolean
}

export interface NcDropDownProps<T> {
	className?: string
	panelMenusClass?: string
	triggerIconClass?: string
	data: NcDropDownItem<T>[]
	renderTrigger?: () => ReactNode
	renderItem?: (item: NcDropDownItem<T>) => JSX.Element
	title?: string
	onClick: (item: NcDropDownItem<T>) => void
	dropdownItemsClass?: string
}

function NcDropDown<T>({
	className = `h-8 w-8 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center`,
	triggerIconClass = 'h-6 w-6',
	panelMenusClass = 'origin-top-right -top-1',
	dropdownItemsClass = 'cursor-pointer flex items-center rounded-xl w-full px-3 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 truncate ',
	title = 'More',
	renderTrigger,
	renderItem,
	data,
	onClick,
}: NcDropDownProps<T>) {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<MenuButton className={className} title={title}>
				{renderTrigger ? (
					renderTrigger()
				) : (
					<EllipsisHorizontalIcon className={triggerIconClass} />
				)}
			</MenuButton>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					className={`absolute ${panelMenusClass} end-0 z-30 w-56 divide-y divide-neutral-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-900 dark:ring-white dark:ring-opacity-10`}
				>
					<div className="px-1.5 py-2 text-sm text-neutral-600 dark:text-neutral-300">
						{data.map((item) => (
							<MenuItem
								as={item.href ? (item.isTargetBlank ? 'a' : Link) : 'div'}
								// @ts-ignore
								href={item.href ?? undefined}
								key={item.id as string}
								onClick={() => onClick(item)}
								data-menu-item-id={item.id}
								className={dropdownItemsClass}
								target={item.isTargetBlank ? '_blank' : undefined}
							>
								{() =>
									renderItem && typeof renderItem(item) !== 'undefined' ? (
										renderItem(item)
									) : (
										<>
											{!!item.icon && (
												<div dangerouslySetInnerHTML={{ __html: item.icon }} />
											)}
											<span className="ms-3">{item.name}</span>
										</>
									)
								}
							</MenuItem>
						))}
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	)
}

export default NcDropDown
