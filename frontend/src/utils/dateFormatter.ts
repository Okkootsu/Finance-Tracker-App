import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";
import i18n from "@/utils/i18n";

const getDateLocale = () => {
  return i18n.language === "tr" ? tr : enUS;
};

export const formatAppDate = (
  date: string | Date,
  dateFormat: string = "d MMMM yyyy",
) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return format(dateObj, dateFormat, {
    locale: getDateLocale(),
  });
};

// Also includes hour:minute
export const formatAppDateTime = (date: string | Date) => {
  return formatAppDate(date, "d MMMM yyyy HH:mm");
};
