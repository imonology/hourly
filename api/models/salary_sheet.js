module.exports = {
	name: 'salary sheet',
	fields: {
		// hourly_rate: {
		// 	name: 'Sort settings',
		// 	type: 'choice',
		// 	desc: '',
		// 	must: true,
		// 	show: true,
		// 	required: true,
		// 	option: [
		// 		{
		// 			value: 'By developer',
		// 			text: 'By developer',
		// 		},
		// 		{
		// 			value: 'By project',
		// 			text: 'By project',
		// 		},
		// 	],
		// },
		// choose_time: {
		// 	name: 'Time sort',
		// 	type: 'choice',
		// 	desc: '',
		// 	must: true,
		// 	show: true,
		// 	required: true,
		// 	option: [
		// 		{
		// 			value: 'Choose Week',
		// 			text: 'Choose Week',
		// 		},
		// 		{
		// 			value: 'Choose Month',
		// 			text: 'Choose Month',
		// 		},
		// 	],
		// },
		// week_time: {
		// 	name: 'Week time',
		// 	type: 'datetime',
		// 	must: true,
		// 	show: true,
		// },
		// month_time: {
		// 	name: 'Month Time',
		// 	type: 'date',
		// 	must: true,
		// 	show: true,
		// },
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
		project: { 
			name: 'Project',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		member: {
			name: 'Member',
			type: 'string',
			desc: '',
			must: false,
			show: false,
		},
		identity:{
			name: 'Identity',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		pricing_method :{
			name: 'Pricing method',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		workload :{
			name: 'Workload',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		ot:{
			name: 'Overtime workload',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		ot_pay:{
			name: 'Overtime pay',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		salary:{
			name: 'Total Salary',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
	}
};