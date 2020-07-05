module.exports = {
	name: '案件',
	fields: {
		applicant: {
			name: '案件名稱',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		pm_hour: {
			name: 'PM 時數',
			type: 'number',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		dev_hour: {
			name: 'Dev 時數',
			type: 'number',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
	},
};
