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
                    fio={'Усанова Дарья Константиновна'}
                    description={'Boom'}
                    imageSrc={'	https://cbgd.ask.fm/cac/d84e8/5281/4793/906e/2bf44759b5fb/original/196934.jpg'}
                    navigateTo={'/usanova'}
                />


            </Stack>
        </div>

    );
};

export default StudentsPage;