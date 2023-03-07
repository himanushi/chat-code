type LineItem = {
	name:
		| 'Instruct models'
		| 'Chat models'
		| 'Fine-tuned models'
		| 'Embedding models'
		| 'Image models'
		| 'Audio models';
};

type DailyCost = {
	line_items: LineItem[];
	timestamp: number;
};

export type RangeUsage = {
	daily_costs: DailyCost[];
	object: 'list';
	total_usage: number;
};

export const getRangeUsage = async (apiKey: string, now: Date) => {
	const date = now;
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const nextMonth = month + 1;
	const start_date = `${year}-${month}-01`;
	const end_date = `${year + Math.floor(month / 12)}-${nextMonth % 12}-01`;

	const options = {
		headers: {
			Authorization: `Bearer ${apiKey}`
		}
	};
	const response = await fetch(
		`https://api.openai.com/dashboard/billing/usage?start_date=${start_date}&end_date=${end_date}`,
		options
	);
	if (!response.ok) {
		throw new Error(`HTTP error ${response.status} ${response.statusText}`);
	}
	const data: RangeUsage = await response.json();
	return data;
};
