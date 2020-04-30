import React, {useState, useEffect, FunctionComponent} from 'react';
import moment from 'moment';
import dateStyles from '../styles/Datepicker.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

moment.updateLocale('es',{
    week:{dow:1,doy:4},
    invalidDate: "Fecha inválida",
    weekdays:["lunes","martes","miércoles","jueves","viernes","sábado","domingo"],
    weekdaysMin:["l","m","x","j","v","s","d"],
    weekdaysShort:["lun","mar","mie","jue","vie","sab","dom"]
});

type Props = {
    minDate?:string,
    maxDate?:string,
    rangeDate:boolean,
    selectDateEvent:(fechaInicio:string,fechaFin:string) => any
}

const DatePicker : FunctionComponent<Props> = ({minDate,maxDate,rangeDate,selectDateEvent}) => {

    const [monthActive,setMonthActive] =useState(moment().month());
    const [yearActive,setYearActive] = useState(moment().year());
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);
    const [hoverDate,setHoverDate] = useState(null);

    const minMoment = moment(minDate,"DD/MM/YYYY");
    const maxMoment = moment(maxDate, "DD/MM/YYYY");


    useEffect(() => {
        console.log(minDate);

        if(!rangeDate && startDate){
            selectDateEvent(startDate._date.format('DD/MM/YYYY'),null);
        }
        if(startDate && endDate && rangeDate){
            selectDateEvent(startDate._date.format('DD/MM/YYYY'),endDate._date.format('DD/MM/YYYY'));
        }
    },[endDate,startDate]);

    function getMonthDetails(){
        let firstDay = moment().month(monthActive).date(1).weekday();
        let numberOfDays = 40 -  moment().year(yearActive).month(monthActive).date(40).get('date');
        return {firstDay:firstDay,numberOfDays:numberOfDays}
    }

    function getDayDetails(i:number,firstDay:number,daysOfMonth:number){
        let d = i - firstDay + 1;
        let thisMonth = !(d < 1 || d > daysOfMonth);
        let date = moment().year(yearActive).month(monthActive).date(d);
        let click = !dateInRange(date);
        return {_date:date, _thisMonth:thisMonth, label: date.get('date'),_notClick:click}
    }

    function getDays() : {_date,_thisMonth,label,_notClick}[]{
        let days = [];
        let md  = getMonthDetails();
        for(let i = 0;i<42;i++) {
            days.push(getDayDetails(i, md.firstDay, md.numberOfDays));
        }
        return days;
    }
    function getMonth(){
        return moment().year(yearActive).month(monthActive).format('MMMM');
    }
    function dateInRange(date){
        let res = true;
        minMoment.isValid() && date.isBefore(minMoment,'date') ? res = false : '';
        maxMoment.isValid() && date.isAfter(maxMoment,'date') ? res = false : '';
        return res;
        // return !((minMoment.isValid() || maxMoment.isValid()) && (date.isBefore(minMoment) || date.isAfter(maxMoment)));
    }

    const handleDates = (day) => {
        if(dateInRange(day._date)){
            if(startDate && !endDate && rangeDate){
                if(day._date.isBefore(startDate._date)){
                    setStartDate(day);
                }
                if(day._date.isSameOrAfter(startDate._date) && rangeDate){
                    setEndDate(day);
                }
            }else{
                setStartDate(day);
                setEndDate(null);
            }
        }
    };

    const getStylesDay = (day) => {
        let styles = dateStyles.day;
        !day._thisMonth ?  styles = styles.concat(' ',dateStyles.disabled) : '';
        day._notClick ? styles = styles.concat(' ',dateStyles.notClick) : '';
        if (startDate &&  moment.isMoment(startDate._date)){
            startDate._date.isSame(day._date,'date') ? styles = styles.concat(' ',dateStyles.startDate) : '';
            if(rangeDate && hoverDate && moment.isMoment(hoverDate._date)){
                day._date.isBetween(startDate._date,hoverDate._date,'date','[]') ? styles = styles.concat(' ', dateStyles.inRange) : '';
                day._date.isSame(hoverDate._date,'date') ? styles = styles.concat(' ', dateStyles.hoveredDate) : '';
            }
        }
        rangeDate && endDate && moment.isMoment(endDate._date) && endDate._date.isSame(day._date,'date') ? styles = styles.concat(' ', dateStyles.endDate) : '';

        return styles;
    };

    const handleHover =(day) => {
        if(startDate && !endDate && rangeDate && dateInRange(day._date)){
            setHoverDate(day);
        }
    };
    return (
        <div className={dateStyles.calendar}>
            <div className={dateStyles.title}>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => setMonthActive(monthActive-1)}/>
                <span>{getMonth()}</span>
                <FontAwesomeIcon icon={faChevronRight} onClick={() => setMonthActive(monthActive+1)}/>
            </div>
            <div className={dateStyles.container}>
                <div className={dateStyles.header}>
                    {moment.weekdaysMin().map((dayLabel,i) => {
                        return <div key={i}>{dayLabel}</div>
                    })}
                </div>
                <div className={dateStyles.body}>
                    {getDays().map((day,i) => {
                        return <div key={i} className={getStylesDay(day)} onClick={() => handleDates(day)} onMouseOver={() => handleHover(day)}>{day.label}</div>
                    })}
                </div>
            </div>

        </div>
    )
};

export default DatePicker;
