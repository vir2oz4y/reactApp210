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
                    fio={'Удалов Кирилл Андреевич'}
                    description={'Student'}
                    imageSrc={'https://avatars.mds.yandex.net/i?id=5f3038bed55e1b47442bc09b643fd0707af43d58-8287805-images-thumbs&n=13'}
                    navigateTo={'/Udalov'}
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


            </Stack>
        </div>

    );
};

export default StudentsPage;