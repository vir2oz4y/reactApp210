import React from 'react'
import Header from '../../../Components/Header/Header'
import ContentBlock from '../../../Components/ContentBlock/ContentBlock'
import AsideMenu from './AsideMenu/AsideMenu'
import { Outlet } from 'react-router-dom'
import './SimakovMatveyPage.scss'

const SimakovMatveyPage = () => {
	return (
		<div>
			<Header studentFio={'Симаков Матвей'} />

			<ContentBlock>
				<div className={'self_page_content'}>
					<AsideMenu />
					<Outlet />
				</div>
			</ContentBlock>
		</div>
	)
}

export default SimakovMatveyPage
