module.exports = {
	name: 'salary filter',
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
					value: 'project',
					text: 'By project',
				},
				// {
				// 	value: 'company',
				// 	text: 'By Company'
				// },
			],
		},
		time_setting: {
			name: 'Time sort',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: [
				{
					value: 'week',
					text: 'Choose Week',
				},
				{
					value: 'month',
					text: 'Choose Month',
				},
			],
		},
		choose_time: {
			name: 'Time',
			type: 'date',
			must: true,
			show: true,
			required: true,
		},
		choose_time_1: {
			name: 'Time2',
			type: 'date',
			show: true,
			required: true,
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