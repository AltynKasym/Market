import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import rock from "@/assets/icons/rock.svg";
import close from "@/assets/icons/close.svg";

import css from "./styles.module.scss";

// TODO: перенести в другую папку
interface Props {
    onClick: () => void;
    views: number;
    day: string;
    contact: number;
}

interface Data {
    name: string;
    day: string;
    uv: number;
    pv: number;
}

interface Date {
    x: number;
    y: number;
    width: number;
    value: number;

}

interface Payload {
    payload: {
        day: string;
        name: string;
        pv: number;
        uv: number;
    };
}

interface Obg {
    payload?: Payload[];
    active?: boolean;
}


export const Chart = ({onClick, views, day, contact}: Props) => {

    let data: Data[] = [
        {
            name: day,
            day: day,
            uv: views,
            pv: contact,
        }
    ];

    data = data.map(el => {
        const temp = el.name.split(" ");
        return {
            ...el,
            name: `${temp[0]} ${temp[1].slice(0, 3)}`,
        };
    });

    const renderCustomBarLabel = ({x, y, width, value}: Date) => {
        return <text
            x={x + width / 2} y={y}
            fill="#828282" fontSize={10} fontFamily="Source Sans Pro"
            fontWeight={400} textAnchor="middle" dy={-6}>
            {`${value}`}
        </text>;
    };

    const CustomTooltip = ({payload, active}: Obg) => {
        if (active) {
            return (
                <div className={css.window}>
                    <p className={css.windowData}>C {payload?.[0].payload.day}</p>
                    <div>
                        <p className={css.windowNumber}>Просмотры объявления: {payload?.[0].payload.uv}</p>
                        <p className={css.windowNumber}>Просмотры контактов: {payload?.[0].payload.pv}</p>
                    </div>
                </div>
            );
        }

        return null;
    };
    return (
        <div className={css.root}>

            <div className={css.chartWrapper}>
                <div className={css.head}>
                    <p>Статистика просмотров объявления за месяц</p>
                    <img src={close} alt="close" onClick={onClick}/>
                </div>
                <div className={css.chartBock}>
                    <BarChart
                        width={617}
                        height={410}
                        data={data}
                        className={css.chart}
                        margin={{
                            top: 0,
                            right: 20,
                            left: -18,
                            bottom: 16
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis dataKey="name" tickLine={false} fontSize={12} minTickGap={-300} fontFamily="Inter"
                            fontWeight={400} angle={270} width={33} dy={18} dx={-7}/>
                        <YAxis stroke="#444444" strokeDasharray="0 1" fontSize={12} fontFamily="Inter"
                            fontWeight={400}/>
                        <Tooltip content={<CustomTooltip/>} cursor/>
                        <Bar dataKey="pv" stackId="a" barSize={12} fill="#2A2349" label={renderCustomBarLabel}/>
                        <Bar dataKey="uv" stackId="a" barSize={12} fill="#00CCDB" label={renderCustomBarLabel}/>
                    </BarChart>

                    <div className={css.textBlock}>
                        <p className={css.title}>С {day} по 6 февраля 2022</p>
                        <p className={css.descr}>Просмотров сегодня: {views + contact}</p>
                        <p className={css.descr}>Просмотров всего: {views + contact}</p>
                        <div className={css.block}>
                            <img src={rock} alt="rock"/>
                            <p className={css.titleRock}>Жгите ваши объявления!</p>
                            <p className={css.descrRock}>Купите услуги продвижения магазина</p>
                            <button className={css.btn}>жечь!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
