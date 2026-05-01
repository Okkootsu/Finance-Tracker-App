import React, { useState, useRef, useEffect } from "react";
import { DateRange, type RangeKeyDict } from "react-date-range";
import { tr, enUS } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar1 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { formatAppDate } from "@/utils/dateFormatter";

type DatePickerProps = {
  onRangeChange: (start: Date, end: Date) => void;
  startDate: Date;
  endDate: Date;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  onRangeChange,
  startDate,
  endDate,
}) => {
  const { i18n } = useTranslation();

  const [range, setRange] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handleRangeChange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;
    if (startDate && endDate) {
      setRange([item.selection as any]);
      onRangeChange(startDate, endDate);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative inline-block p-1 text-sm font-bold"
      ref={calendarRef}
    >
      <div
        onClick={() => setOpen(!open)}
        className="border border-blue-300 text-white py-2 px-3 rounded-lg shadow-sm cursor-pointer bg-blue-600 flex items-center justify-between min-w-fit gap-3"
      >
        <span>
          <Calendar1 />
        </span>
        <span>
          {`${formatAppDate(range[0].startDate)} - ${formatAppDate(range[0].endDate)}`}
        </span>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 left-0 shadow-2xl border border-gray-200 rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <DateRange
            onChange={handleRangeChange}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            locale={i18n.language === "tr" ? tr : enUS}
            rangeColors={["#3B82F6"]}
          />
        </div>
      )}
    </div>
  );
};
