import React from 'react'
import { Modal, Typography } from '@mui/material'
import './SimakovPopup.scss'
import Button from '@mui/material/Button'

export type IPopup = {
	open: boolean
	onClose: () => void
}

type Props = IPopup & {
	children: any
	title: string
}

const SimakovPopup = ({ open, onClose, children, title }: Props) => {
	return (
		<Modal open={open} onClose={() => onClose}>
			<Typography className={'simakov_popup'}>
				<div className={'simakov_popup__content'}>
					<div className={'simakov_popup__content__header'}>
						<div>{title}</div>
						<div>
							<Button onClick={() => onClose()}>Закрыть</Button>
						</div>
					</div>
					<div>{children}</div>
				</div>
			</Typography>
		</Modal>
	)
}

export default SimakovPopup
