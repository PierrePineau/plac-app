import React, { useState } from "react";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fr");
const localizer = momentLocalizer(moment);

export default function SchedulePlanning() {
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);

  const handleSelect = () => {
    const title = window.prompt("New Event name");
  };

  const CustomHeader = ({ label } : any) => (
    <div className="bg-neutral-50 text-neutral-950 border  font-semibold text-center p-2 rounded-lg">
      {label}
    </div>
  );

  return (
    <div className="App">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        view={currentView}
        onView={(view: View) => setCurrentView(view)}
        views={{
          day: true,
          week: true,
          month: true,
          work_week: true
        }}
        selectable
        events={[]}
        onSelectEvent={() => {}}
        onSelectSlot={handleSelect}
        toolbar
        components={{
          header: CustomHeader,
        }}
      />
    </div>
  );
}
