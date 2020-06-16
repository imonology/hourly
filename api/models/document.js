module.exports = {
	name: '文件1',
	fields: {
		applicant: {
			name: '申請者',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
			span: 12,
		},
		zipcode: {
			name: '鄉鎮縣市',
			type: 'twzipcode',
			desc: '',
			must: true,
			show: true,
			required: false,
			span: 12,
			option: [],
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
			},
		},
		item: {
			name: '項目',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: false,
			span: 12,
			option: [
				{
					value: 'green_cert',
					text: '綠保',
				},
				{
					value: 'organic',
					text: '有機',
				},
			],
		},
		desc1: {
			name: '描述1',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: false,
			span: 8,
			validator: (rule, value, callback) => {
				console.log('開始驗證');
				console.log(value);
				if (value !== 'BBB') {
					callback(new Error('error'));
				} else {
					callback();
				}
			},
		},
		desc2: {
			name: '描述2',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
			span: 8,
		},
		desc3: {
			name: '描述3',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
			span: 8,
		},
		desc4: {
			name: '描述4',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		desc5: {
			name: '描述5',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		desc6: {
			name: '描述6',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		statement: {
			name: '聲明',
			type: 'statement',
			error_message: '請同意聲明內容',
			desc: '哈囉哈囉哈囉',
			must: true,
			show: false,
			required: false,
		},
	},
};
