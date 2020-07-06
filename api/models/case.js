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
		sub_data: {
			name: '多筆資料',
			type: 'sub_model',
			must: false,
			show: true,
			required: false,
			forbid_delete: false,
			fields: {
				data1: {
					name: '單據名',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: true,
					validator: `{
						message: '你必須是 CCC',
						validator: (rule, value, callback) => {
							console.log('開始驗證');
							console.log(value);
							if (value !== 'CCC') {
								callback(new Error('error'));
							} else {
								callback();
							}
						},
						required: true,
					}`,
				},
				data2: {
					name: '文件項目',
					type: 'choice',
					desc: '',
					must: true,
					show: true,
					required: false,
					option: [
						{
							value: 'category1',
							text: '類別1',
						},
						{
							value: 'category2',
							text: '類別2',
						},
					],
				},
				data3: {
					name: '文件描述1',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: false,
				},
				boo3: {
					name: '是否',
					type: 'boolean',
					shape: 'checkbox',
					desc: '',
					must: false,
					show: true,
					required: false,
				},
			},
		},
	},
};
