import { parseISO, format } from "date-fns";

const Date: React.FC<{ dateString: string }> = ({ dateString }) => {
	const date = parseISO(dateString);
	return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
};
Date.displayName = "Date";

export default Date;
