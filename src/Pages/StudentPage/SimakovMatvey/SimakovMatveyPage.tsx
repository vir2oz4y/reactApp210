import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import ContentBlock from '../../../Components/ContentBlock/ContentBlock'
import AsideMenu from './AsideMenu/AsideMenu'
import { Outlet } from 'react-router-dom'
import './SimakovMatveyPage.scss'
import axios from 'axios'

export const simakovAxios = axios.create({})
simakovAxios.defaults.headers.common['Authorization'] = localStorage.getItem('canstudyAuthToken') || ''

const SimakovMatveyPage = () => {
	const [authToken, setAuthToken] = useState('')

	const doLogin = () => {
		axios
			.post<{ authToken: string }>('https://canstudy.ru/orderapi/user/login', {
				identifier: '69E4531D-36EF-4A7C-AC30-CF9838B2652F',
			})
			.then((res) => {
				let bearer = 'Bearer ' + res.data.authToken
				localStorage.setItem('canstudyAuthToken', bearer)
				simakovAxios.defaults.headers.common['Authorization'] = bearer
			})
	}

	useEffect(() => {
		doLogin()
	}, [])

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
