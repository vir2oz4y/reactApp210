import React from 'react';
import StudentElement from "../Components/StudentElement/StudentElement";
import {Stack} from "@mui/material";
import Header from "../Components/Header/Header";

const StudentsPage = () => {

    return (
        <div>
            <Header/>

            <Stack direction="row" spacing={2} padding={'1em'}>

                <StudentElement
                    fio={'Крючков Николай Алексеевич'}
                    description={'Middle fullstack developer'}
                    imageSrc={'https://fanibani.ru/images/wp-content/uploads/2017/06/Volk-42.jpg'}
                    navigateTo={'/teacher'}
                />

                <StudentElement
                    fio={'Ондышев Дмитрий Витальевич'}
                    description={'Не Middle fullstack developer'}
                    imageSrc={'https://avatars.githubusercontent.com/u/52341158?v=4'}
                    navigateTo={'/ondyshev'}
                 />

                <StudentElement
                    fio={'Трубников Тимур Андреевич'}
                    description={'Student'}
                    imageSrc={'https://fanibani.ru/images/wp-content/uploads/2017/06/Volk-42.jpg'}
                    navigateTo={'/trubnikov'}
                 />

                 <StudentElement
                    fio={'Кирютин Владислав Вадимович'}
                    description={'Бархатные тяги'}
                    imageSrc={'https://i.imgur.com/iNkudWF.png'}
                    navigateTo={'/Vlados'}
                />
                
                <StudentElement
                    fio={'Пепелев Сергей Сергеевич'}
                    description={'ЛЯ, НУ ЭТО БОСС'}
                    imageSrc={'https://cdn.vox-cdn.com/thumbor/qCfHPH_9Mw78vivDlVDMu7xYc78=/715x248:1689x721/920x613/filters:focal(972x299:1278x605):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/69305239/shrek4_disneyscreencaps.com_675.0.jpg'}
                    navigateTo={'/Serega'}
                />

                <StudentElement
                    fio={'Агеев Александр Андреевич'}
                    description={'матиз 5.5 v12'}
                    imageSrc={'https://www.thedrive.com/content/2021/03/NRE-lead.jpg?quality=85'}
                    navigateTo={'/Ageev'}
                />

                <StudentElement
                    fio={'Щеголева Екатерина Сергеевна'}
                    description={'студент0чка'}
                    imageSrc={'https://avatars.dzeninfra.ru/get-zen_doc/3414416/pub_611a2ee07e37175eb617dd99_611d057b945d7f24e36a526f/scale_1200'}
                    navigateTo={'/Shchegoleva'}
                />

                
                <StudentElement
                    fio={'Усанова Дарья Константиновна'}
                    description={'Boom'}
                    imageSrc={'	https://cbgd.ask.fm/cac/d84e8/5281/4793/906e/2bf44759b5fb/original/196934.jpg'}
                    navigateTo={'/usanova'}
                />

                <StudentElement
                    fio={'Безлепкина Калерия Борисовна'}
                    description={'cute girl'}
                    imageSrc={'https://wdorogu.ru/images/wp-content/uploads/2020/10/feda8bbd51ff950-scaled.jpg'}
                    navigateTo={'/Bezlepkina'}
                />


            </Stack>
        </div>

    );
};

export default StudentsPage;