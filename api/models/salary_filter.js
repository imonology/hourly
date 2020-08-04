module.exports = {
	name: 'salary sheet',
	fields: {
		sort_settings: {
			name: 'Sort settings',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: [
				{
					value: 'dev',
					text: 'By developer',
				},
				{
					value: 'proj',
					text: 'By project',
				},
			],
		},
		choose_time: {
			name: 'Time sort',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: [
				{
					value: 'Choose Week',
					text: 'Choose Week',
				},
				{
					value: 'Choose Month',
					text: 'Choose Month',
				},
			],
		},
		week_time: {
			name: 'Week time',
			type: 'datetime',
			must: true,
			show: true,
		},
		month_time: {
			name: 'Month Time',
			type: 'date',
			must: true,
			show: true,
		},
		// choose_company:{
		// 	name: 'Choose company',
		// 	type: 'choice',
		// 	desc: '',
		// 	must: true,
		// 	show: true,
		// 	required: true,
		// 	option: [
		// 		{
		// 			value: 'A',
		// 			text: 'A',
		// 		},
		// 		{
		// 			value: 'B',
		// 			text: 'B',
		// 		},
		// 	],
		// },
	}
};