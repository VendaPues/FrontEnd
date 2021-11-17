import React from "react";
import "./styles/ComponentsStyles.css";
import DatePicker from "react-datepicker";

const DateFilterForm = ({
  currentStartDate,
  setStartDateAction,
  currentEndDate,
  setEndDateAction,
}) => {
  return (
    <div className="row date-form-container">
      <div className="col-sm">
        <span className="date-form-filter-title">Rango de Fechas:</span>
      </div>
      <div className="datepicker-container col-sm">
        <DatePicker
          selected={currentStartDate}
          onChange={(date) => setStartDateAction(date)}
        />
        <i className="far fa-calendar calendarIcon"></i>
      </div>
      <div className="datepicker-container col-sm">
        <DatePicker
          selected={currentEndDate}
          onChange={(date) => setEndDateAction(date)}
        />
        <i className="far fa-calendar calendarIcon"></i>
      </div>
    </div>
  );
};

export default DateFilterForm;
