import type { CreateCompletionResponseUsageWithModel } from '~/store/chatList';
import { models } from '~/store/openaiModel';

const per = 0.75;

export const calcCurrency = ({
	usages,
	currencyExchangeRate,
	currencyUnit
}: {
	usages: CreateCompletionResponseUsageWithModel[];
	currencyExchangeRate: number;
	currencyUnit: string;
}) => {
	const promptCurrency = usages
		.map(
			(u) =>
				u.prompt_tokens * per * (models.find((m) => m.name === u.model)?.promptPrice ?? 0.000002)
		)
		.reduce((a, b) => a + b, 0);

	const completionCurrency = usages
		.map(
			(u) =>
				u.completion_tokens *
				per *
				(models.find((m) => m.name === u.model)?.completionPrice ?? 0.000002)
		)
		.reduce((a, b) => a + b, 0);

	const tokens = usages.map((u) => u.total_tokens).reduce((a, b) => a + b, 0);

	const currency =
		((promptCurrency + completionCurrency) * currencyExchangeRate).toFixed(2) + currencyUnit;

	return { tokens, currency };
};
